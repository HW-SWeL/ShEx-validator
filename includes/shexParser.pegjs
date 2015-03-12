{
    function createStack () {
	var ret = [];
	ret.peek = function () { return this.slice(-1)[0]};
	ret.replace = function (elt) { this[this.length-1] = elt; };
	return ret;
    }
    var curSubject   = createStack();
    var curPredicate = createStack();
    var curListHead  = createStack();
    var curListTail  = createStack();
    var insertTripleAt = createStack(); // where to place (collection) triples for nice defaults
    var db = RDF.Dataset();
    db.nextInsertAt = null;
    db.add = function (s, p, o) {
	var t = RDF.Triple(s, p, o);
    	if (this.nextInsertAt == null)
    	    this.push(t);
    	else {
    	    this.insertAt(this.nextInsertAt, t);
    	    this.nextInsertAt = null;
    	}
    }
    var RDF_NS = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
    var XSD_NS = 'http://www.w3.org/2001/XMLSchema#'
    var iriResolver = ("iriResolver" in options) ? options.iriResolver : RDF.createIRIResolver();
    var bnodeScope = ("bnodeScope" in options) ? options.bnodeScope : RDF.createBNodeScope();
    iriResolver.errorHandler = function (message) {
        throw peg$buildException(message, null, peg$reportedPos);
    };

    function _literalHere (value, type) {
	var dt = RDF.IRI(XSD_NS+type, RDF.Position5(text(), line(), column(), offset(), value.length));
	var pos = RDF.Position5(text(), line(), column(), offset(), value.length);
	return RDF.RDFLiteral(value, undefined, dt, pos);
    }
}

turtleDoc = _ statement* _ {
    if (curSubject.length > 0 ||
	curPredicate.length > 0) {
	return {_: "Bad end state:",
		s:curSubject,
		p:curPredicate,
		t:db.triples.map(
		    function (t) { return t.toString(); }
		).join('\n')
	       };
    }
    // t:db.triples.map( function (t) { console.log(t.toString()); } )
    return db;
}

statement       = directive _ / triples _ '.' _
directive       = prefix / base / sparqlPrefix / sparqlBase
prefix          = PREFIX _ pre:PNAME_NS _ i:IRIREF _ '.' { iriResolver.setPrefix(pre, i.lex); }
base            = BASE _ i:IRIREF _ '.' { iriResolver.setBase(i.lex); }
sparqlPrefix    = SPARQL_PREFIX _ pre:PNAME_NS _ i:IRIREF { iriResolver.setPrefix(pre, i.lex); }
sparqlBase      = SPARQL_BASE _ i:IRIREF { iriResolver.setBase(i.lex); }

triples         = _ subject predicateObjectList { curSubject.pop(); }
                / _ blankNodePropertyList predicateObjectList? { curSubject.pop(); }
subject         = i:iri { curSubject.push(i); }
                / b:BlankNode { curSubject.push(b); }

predicateObjectList = _ verb objectList (_ ';' _ (verb objectList)* )*
verb            = v:predicate { curPredicate.push(v); }
                / v:RDF_TYPE { curPredicate.push(v); }
predicate       = iri
objectList      = _ o:object oz:(_ ',' _ object)* { curPredicate.pop(); }

object = n:iri                   { db.add(curSubject.peek(), curPredicate.peek(), n); return n; }
       / n:BlankNode             { db.add(curSubject.peek(), curPredicate.peek(), n); return n; }
       / n:collection            { db.add(curSubject.peek(), curPredicate.peek(), n); return n; }
       / n:blankNodePropertyList { db.add(curSubject.peek(), curPredicate.peek(), n); return n; }
       / n:literal               { db.add(curSubject.peek(), curPredicate.peek(), n); return n; }

blankNodePropertyList = s:_lbracket predicateObjectList _ _rbracket { curSubject.pop(); return s; }
_lbracket       = '['            {
    var ret = RDF.BNode(bnodeScope.nextLabel(), RDF.Position5(text(), line(), column(), offset(), 1));
    curSubject.push(ret);
    return ret;
}
_rbracket       = ']'

// Collections
collection      = _openCollection _ _members* r:_closeCollection                                 { return r; }
_openCollection = '('            {
    curListHead.push(null);
    curListTail.push(null);
    insertTripleAt.push(db.triples.length);
    curSubject.push(RDF.BNode(bnodeScope.nextLabel(), RDF.Position5(text(), line(), column()-1, offset()-1, 1)));
    curPredicate.push(RDF.IRI(RDF_NS+'first', RDF.Position5(text(), line(), column(), offset(), 1)));
}
_closeCollection= ')'            {
    curSubject.pop();
    curPredicate.pop();
    var nil = RDF.IRI(RDF_NS+'nil', RDF.Position5(text(), line(), column(), offset(), 1));
    if (curListHead.peek() != null) // got some elements
        db.add(curListTail.peek(),
               RDF.IRI(RDF_NS+'rest', RDF.Position5(text(), line(), column()-1, offset()-1, 1)),
               nil);
    db.nextInsertAt = insertTripleAt.pop();
    curListTail.pop();
    var ret = curListHead.pop();
    return (ret == null) ? nil : ret;
}
_members = o:object _           {
    var cur = curSubject.peek();
    if (curListHead.peek() == null)
        curListHead.replace(cur);
    else {
	db.nextInsertAt = db.triples.length-1;
        db.add(curListTail.peek(), // last tail
               RDF.IRI(RDF_NS+'rest', RDF.Position5(text(), line(), column(), offset(), 1)),
               cur);
	db.nextInsertAt = null;
    }
    var next = RDF.BNode(bnodeScope.nextLabel(), RDF.Position5(text(), line(), o._pos.column-2, o._pos.offset-2, 1));
    curListTail.replace(cur);
    curSubject.replace(next);
    curPredicate.replace(RDF.IRI(RDF_NS+'first', RDF.Position5(text(), line(), o._pos.column-1, o._pos.offset-1, 1)));
}

// Literals
literal        = RDFLiteral / NumericLiteral / BooleanLiteral
NumericLiteral = value:DOUBLE  { return _literalHere(value, 'double'); }
               / value:DECIMAL { return _literalHere(value, 'decimal'); }
               / value:INTEGER { return _literalHere(value, 'integer'); }
RDFLiteral     = s:String _ l:LANGTAG { return RDF.RDFLiteral(s.lex, l, undefined, RDF.Position5(text(), s.line, s.column, s.offset, s.length+1+l._pos.width)); }
               / s:String _ '^^' _ i:iri { return RDF.RDFLiteral(s.lex, undefined, i, RDF.Position5(text(), s.line, s.column, s.offset, s.length+2+i._pos.width)); }
               / s:String      { return RDF.RDFLiteral(s.lex, undefined, undefined, RDF.Position5(text(), s.line, s.column, s.offset, s.length)); }
BooleanLiteral = 'true'        { return _literalHere('true', 'boolean'); }
               / 'false'       { return _literalHere('false', 'boolean'); }
String = STRING_LITERAL_LONG1 / STRING_LITERAL_LONG2 / STRING_LITERAL1 / STRING_LITERAL2

// IRIs
iri = IRIREF / PrefixedName
PrefixedName = ln:PNAME_LN {
    return RDF.IRI(iriResolver.getAbsoluteIRI(iriResolver.getPrefix(ln.prefix) + ln.lex), RDF.Position5(text(), line(), column(), offset(), ln.width));
}
    / p:PNAME_NS { return RDF.IRI(iriResolver.getAbsoluteIRI(iriResolver.getPrefix(p)), RDF.Position5(text(), line(), column(), offset(), p.length+1)); }
BlankNode = BLANK_NODE_LABEL / ANON

// Terminals:
RDF_TYPE = 'a' { return RDF.IRI(RDF_NS+'type', RDF.Position5(text(), line(), column(), offset(), 1)); }

IRIREF = b:_IRIREF_BEGIN s:([^\u0000-\u0020<>\"{}|^`\\] / UCHAR)* e:_IRIREF_END {
    return RDF.IRI(iriResolver.getAbsoluteIRI(s.join('')), RDF.Position5(text(), line(), column(), offset(), e-b+1));
}
_IRIREF_BEGIN = '<' { return offset(); }
_IRIREF_END = '>' { return offset(); }

PREFIX = '@prefix'
BASE = '@base'
SPARQL_PREFIX = [Pp][Rr][Ee][Ff][Ii][Xx]
SPARQL_BASE = [Bb][Aa][Ss][Ee]
PNAME_NS = pre:PN_PREFIX? ':' { return pre ? pre : '' } // pre+'|' : '|';
PNAME_LN = pre:PNAME_NS l:PN_LOCAL {
    return {width: pre.length+1+l.length, prefix:pre, lex:l};
}

BLANK_NODE_LABEL = '_:' first:(PN_CHARS_U / [0-9]) rest:BLANK_NODE_LABEL2* {
    return RDF.BNode(bnodeScope.uniqueLabel(first+rest.join('')), RDF.Position5(text(), line(), column(), offset(), 2+first.length+rest.length));
}
BLANK_NODE_LABEL2 = l:'.' r:BLANK_NODE_LABEL2 { return l+r; }
          / l:PN_CHARS r:BLANK_NODE_LABEL2? { return r ? l+r : l; }
LANGTAG          = '@' s:([a-zA-Z]+ ('-' [a-zA-Z0-9]+)*) {
    s[1].splice(0, 0, '');
    var str = s[0].join('')+s[1].reduce(function(a,b){return a+b[0]+b[1].join('');});
    return RDF.LangTag(str, RDF.Position5(text(), line(), column()+1, offset()+1, str.length));
}
INTEGER          = sign:[+-]? s:[0-9]+ { if (!sign) sign=''; return sign+s.join(''); }
DECIMAL          = sign:[+-]? l:[0-9]* '.' d:[0-9]+ { if (!sign) sign=''; return sign+l.join('')+'.'+d.join(''); }
DOUBLE           = sign:[+-]? v:_DOUBLE_VAL { if (!sign) sign=''; return sign+v; }
_DOUBLE_VAL      = m:[0-9]+ '.' d:[0-9]* e:EXPONENT { return m.join('')+'.'+d.join('')+e; }
                 / '.' d:[0-9]+ e:EXPONENT { return '.'+d.join('')+e; }
                 / m:[0-9]+ e:EXPONENT { return m.join('')+e; }
EXPONENT         = e:[eE] sign:[+-]? l:[0-9]+ { if (!sign) sign=''; return e+sign+l.join(''); }
STRING_LITERAL1  = b:_STRING_LITERAL1_DELIM s:_NON_1* e:_STRING_LITERAL1_DELIM { return {line:line(), column:column(), offset:offset(), length:e-b+1, lex:s.join('')}; }
_STRING_LITERAL1_DELIM = "'" { return offset(); }
_NON_1 = [^\u0027\u005C\u000A\u000D] / ECHAR / UCHAR
STRING_LITERAL2  = b:_STRING_LITERAL2_DELIM s:_NON_2* e:_STRING_LITERAL2_DELIM { return {line:line(), column:column(), offset:offset(), length:e-b+1, lex:s.join('')}; }
_STRING_LITERAL2_DELIM = '"' { return offset(); }
_NON_2 = [^\u0022\u005C\u000A\u000D] / ECHAR / UCHAR
STRING_LITERAL_LONG1 = b:_STRING_LITERAL_LONG1_DELIM s:_NON_LONG1* e:_STRING_LITERAL_LONG1_DELIM { return {line:line(), column:column(), offset:offset(), length:e-b+3, lex:s.join('')}; }
_STRING_LITERAL_LONG1_DELIM = "'''" { return offset(); }
_NON_LONG1 = q:_LONG1? c:[^'\\] { // '
    return q ? q+c : c;
}
           / ECHAR / UCHAR
_LONG1 = "''" / "'"
STRING_LITERAL_LONG2 = b:_STRING_LITERAL_LONG2_DELIM s:_NON_LONG2* e:_STRING_LITERAL_LONG2_DELIM { return {line:line(), column:column(), offset:offset(), length:e-b+3, lex:s.join('')}; }
_STRING_LITERAL_LONG2_DELIM = '"""' { return offset(); }
_NON_LONG2 = q:_LONG2? c:[^"\\] { // "
    return q ? q+c : c;
}
           / ECHAR / UCHAR
_LONG2 = '""' / '"'
UCHAR            = '\\u's:(HEX HEX HEX HEX) { return String.fromCharCode(parseInt(s.join(''), 16)); }
    / '\\U's:(HEX HEX HEX HEX HEX HEX HEX HEX) {
    var code = parseInt(s.join(''), 16);
    if (code<0x10000) { // RDFa.1.2.0.js:2712
        return String.fromCharCode(code);
    } else {
        // Treat this as surrogate pairs until use cases for me to push it up to the toString function. (sigh)
        var n = code - 0x10000;
        var h = n >> 10;
        var l = n & 0x3ff;
        return String.fromCharCode(h + 0xd800) + String.fromCharCode(l + 0xdc00);
    }
}
ECHAR = '\\' r:[tbnrf"'\\] { // "
    return r=='t' ? '\t'
         : r=='b' ? '\b'
         : r=='n' ? '\n'
         : r=='r' ? '\r'
         : r=='f' ? '\f'
         : r=='"' ? '"'
         : r=='\'' ? '\''
         : '\\'
}
ANON             = '[' s:_ ']' { return RDF.BNode(bnodeScope.nextLabel(), RDF.Position5(text(), line(), column(), offset(), s.length+2)); }
PN_CHARS_BASE = [A-Z] / [a-z]
 / [\u00C0-\u00D6] / [\u00D8-\u00F6] / [\u00F8-\u02FF]
 / [\u0370-\u037D] / [\u037F-\u1FFF]
 / [\u200C-\u200D] / [\u2070-\u218F]
 / [\u2C00-\u2FEF] / [\u3001-\uD7FF]
// anything else kills PEG
// / [\uF900-\uFDCF] / [\uFDF0-\uFFFD] /
// / [\uD800-\uDB7F] [\uDC00-\uDFFF] // UTF-16 for [#x10000-#xEFFFF]

PN_CHARS_U = PN_CHARS_BASE / '_'
PN_CHARS = PN_CHARS_U / '-' / [0-9]
PN_PREFIX = b:PN_CHARS_BASE r:PN_PREFIX2? { return r ? b+r : b; }
PN_PREFIX2 = l:'.' r:PN_PREFIX2 { return l+r; }
           / l:PN_CHARS r:PN_PREFIX2? { return r ? l+r : l; }

PN_LOCAL = l:(PN_CHARS_U / ':' / [0-9] / PLX) r:PN_LOCAL2?
{ return r ? l+r : l; }
PN_LOCAL2 = l:'.' r:PN_LOCAL2 { return l+r; }
          / l:PN_CHARS_colon_PLX r:PN_LOCAL2? { return r ? l+r : l; }
PN_CHARS_colon_PLX = PN_CHARS / ':' / PLX
PLX = PERCENT / PN_LOCAL_ESC
PERCENT = '%' l:HEX r:HEX { return '%'+l+r; }
HEX = [0-9] / [A-F] / [a-f]
PN_LOCAL_ESC = '\\' r:[_~.!$&'()*+,;=/?#@%-] { return r; }

_ = x:(WS / COMMENT)* { return ''; }
WS               = [ \t\r\n]+ { return ''; }
COMMENT          =  "#" comment:[^\r\n]* { db.addComment(new RDF.Comment(comment.join(''), RDF.Position5(text(), line(), column(), offset(), comment.length+1))); }
// [/terminals]
