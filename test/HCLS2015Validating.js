var ShExWrapper = require("./ShExWrapper.js");
var assert = require("assert");

describe("HCLS 2015 Tests", function () {
    it("should validate chembl as SummaryLevelShape", function (done) {
        var validationResult = function (res) {
            assert(res.passed);
            done();
        };
        ShExWrapper.validate(schema, data, "validationResult", validationResult, {"http://rdf.ebi.ac.uk/chembl/chembl": "<SummaryLevelShape>"});
    });

    it.skip("should validate chembl17 as VersionLevelShape", function (done) {
        var validationResult = function (res) {
            assert(res.passed);
            done();
        };
        ShExWrapper.validate(schema, data, "validationResult", validationResult, {"http://rdf.ebi.ac.uk/chembl/chembl17": "<VersionLevelShape>"});
    });
});

var data = 'BASE <http://rdf.ebi.ac.uk/chembl/>\n \
PREFIX : <http://rdf.ebi.ac.uk/chembl/>\n \
PREFIX ncit: <http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#>\n \
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n \
\n \
PREFIX cito: <http://purl.org/spar/cito/>\n \
PREFIX dcat: <http://www.w3.org/ns/dcat#>\n \
PREFIX dctypes: <http://purl.org/dc/dcmitype/>\n \
PREFIX dct: <http://purl.org/dc/terms/>\n \
PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n \
PREFIX freq: <http://purl.org/cld/freq/>\n \
PREFIX idot: <http://identifiers.org/idot/>\n \
PREFIX lexvo: <http://lexvo.org/ontology#>\n \
PREFIX pav: <http://purl.org/pav/>\n \
PREFIX prov: <http://www.w3.org/ns/prov#>\n \
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n \
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n \
PREFIX schemaorg: <http://schema.org/>\n \
PREFIX sd: <http://www.w3.org/ns/sparql-service-description#>\n \
PREFIX sio: <http://semanticscience.org/resource/>\n \
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n \
PREFIX void: <http://rdfs.org/ns/void/>\n \
PREFIX void-ext: <http://ldf.fi/void-ext#>\n \
\n \
###Summary Level (Complete)\n \
:chembl\n \
    rdf:type dctypes:Dataset;\n \
    dct:title \"ChEMBL\"@en ;\n \
    dct:alternative \"ChEMBLdb\"@en ;\n \
    dct:description \"ChEMBL is a database of bioactive compounds, their quantitative properties and bioactivities (binding constants, pharmacology and ADMET, etc). The data is abstracted and curated from the primary scientific literature.\"@en ;\n \
    dct:publisher :ebi ;\n \
    foaf:page <http://www.ebi.ac.uk/chembl/> ;\n \
    schemaorg:logo <http://www.ebi.ac.uk/rdf/sites/ebi.ac.uk.rdf/files/resize/images/rdf/chembl_service_logo-146x48.gif> ;\n \
    dct:license <http://creativecommons.org/licenses/by-sa/3.0/> ;\n \
    dct:rights \"\"\"The data in ChEMBL is covered by the Creative Commons By Attribution. Under the -BY clause, we request attribution for subsequent use of ChEMBL. For publications using ChEMBL data, the primary current citation is:\n \
\n \
1. A. Gaulton, L. Bellis, J. Chambers, M. Davies, A. Hersey, Y. Light, S. McGlinchey, R. Akhtar, A.P. Bento, B. Al-Lazikani, D. Michalovich, & J.P. Overington (2012) \'ChEMBL: A Large-scale Bioactivity Database For Chemical Biology and Drug Discovery\' Nucl. Acids Res. Database Issue. 40 D1100-1107 DOI:10.1093/nar/gkr777 PMID:21948594\n \
\n \
If ChEMBL is incorporated into other works, we ask that the ChEMBL IDs are preserved, and that the release number of ChEMBL is clearly displayed.\"\"\"@en ;\n \
    dcat:theme ncit:C48807 ; #chemical\n \
    dcat:keyword \"assay\"^^xsd:string, \"chemical\"^^xsd:string ;\n \
    dct:references <http://dx.doi.org/10.1093/bioinformatics/btt765> ;\n \
    rdfs:seeAlso <http://en.wikipedia.org/wiki/ChEMBL> ;\n \
    cito:citesAsAuthority <http://nar.oxfordjournals.org/content/40/D1/D1100> ;\n \
    dct:hasPart :chembl17_rdf_molecule_dataset, :chembl17_rdf_target_dataset ;\n \
#Identifiers\n \
    idot:preferredPrefix \"chembl\" ;\n \
    idot:alternatePrefix \"chembldb\" ;\n \
#Provenance and Change\n \
    pav:hasCurrentVersion :chembl17 ;\n \
    dct:accrualPeriodicity freq:quarterly;\n \
#Availability/Distributions\n \
    dcat:accessURL <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBLdb> ;\n \
    void:sparqlEndpoint <https://www.ebi.ac.uk/rdf/services/chembl/sparql>;\n \
.\n \
\n \
:ebi\n \
    foaf:page <https://www.ebi.ac.uk/chembl/> ;\n \
.\n \
\n \
###Version Level (Complete)\n \
:chembl17\n \
    rdf:type dctypes:Dataset;\n \
    dct:title \"ChEMBL Version 17\"@en ;\n \
    dct:alternative \"ChEMBLdb17\"@en ;\n \
    dct:description \"ChEMBL17 is a database of bioactive compounds, their quantitative properties and bioactivities (binding constants, pharmacology and ADMET, etc). The data is abstracted and curated from the primary scientific literature.\"@en ;\n \
    dct:created \"2013-08\"^^xsd:gYearMonth;\n \
    pav:createdOn \"2013-08\"^^xsd:gYearMonth;\n \
    pav:authoredOn \"2013-07\"^^xsd:gYearMonth;\n \
    pav:curatedOn \"2013-07\"^^xsd:gYearMonth;\n \
    dct:creator :ebi ;\n \
    dct:contributor :annaGaulton ;\n \
    pav:createdBy <http://orcid.org/0000-0002-8011-0300> ;\n \
    pav:authoredBy :annaGaulton ;\n \
    pav:curatedBy :annaGaulton ;\n \
    dct:issued \"2013-08-29\"^^xsd:date ;\n \
    dct:publisher :ebi ;\n \
    foaf:page <http://www.ebi.ac.uk/chembl/> ;\n \
    schemaorg:logo <http://www.ebi.ac.uk/rdf/sites/ebi.ac.uk.rdf/files/resize/images/rdf/chembl_service_logo-146x48.gif> ;\n \
    dct:license <http://creativecommons.org/licenses/by-sa/3.0/> ;\n \
    dct:rights \"\"\"The data in ChEMBL is covered by the Creative Commons By Attribution. Under the -BY clause, we request attribution for subsequent use of ChEMBL. For publications using ChEMBL data, the primary current citation is:\n \
\n \
1. A. Gaulton, L. Bellis, J. Chambers, M. Davies, A. Hersey, Y. Light, S. McGlinchey, R. Akhtar, A.P. Bento, B. Al-Lazikani, D. Michalovich, & J.P. Overington (2012) \'ChEMBL: A Large-scale Bioactivity Database For Chemical Biology and Drug Discovery\' Nucl. Acids Res. Database Issue. 40 D1100-1107 DOI:10.1093/nar/gkr777 PMID:21948594\n \
\n \
If ChEMBL is incorporated into other works, we ask that the ChEMBL IDs are preserved, and that the release number of ChEMBL is clearly displayed.\"\"\"@en ;\n \
    dct:language <http://lexvo.org/id/iso639-3/eng> ;\n \
    dcat:theme ncit:C48807 ;\n \
    dcat:keyword \"assay\"^^xsd:string, \"chemical\"^^xsd:string ;\n \
    dct:conformsTo <http://www.w3.org/2001/sw/hcls/notes/hcls-dataset/> ;\n \
    dct:references <http://dx.doi.org/10.1093/bioinformatics/btt765> ;\n \
    rdfs:seeAlso <http://en.wikipedia.org/wiki/ChEMBL> ;\n \
    cito:citesAsAuthority <http://nar.oxfordjournals.org/content/40/D1/D1100> ;\n \
    dct:hasPart :chembl17_rdf_molecule_dataset, :chembl17_rdf_target_dataset ;\n \
#Identifiers\n \
    idot:preferredPrefix \"chembl\" ;\n \
    idot:alternatePrefix \"chembldb\" ;\n \
#Provenance and Change\n \
    pav:version \"17\"^^xsd:string, \"17.0\" ;\n \
    dct:isVersionOf :chembl ;\n \
    pav:previousVersion :chembl16 ;\n \
    dct:source :pubchem-bioassay-09-01-2014 ;\n \
    pav:retrievedFrom :pubchem-bioassay-09-01-2014 ;\n \
    prov:wasDerivedFrom :pubchem-bioassay-09-01-2014 ;\n \
#Availability/Distributions\n \
    dcat:distribution :chembl17db, :chembl17rdf ;\n \
    dcat:accessURL <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBLdb/releases/chembl_17/> ;\n \
    dcat:landingPage <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBLdb/releases/chembl_17/chembl_17_release_notes.txt> ;\n \
.\n \
\n \
:annaGaulton foaf:name \"Anna Gaulton\" .\n \
\n \
###Distribution (non-RDF) description (Complete)\n \
:chembl17db\n \
    a dctypes:Dataset, dcat:Distribution ;\n \
    dct:title \"ChEMBL Version 17 Database Distribution\"@en ;\n \
    dct:alternative \"ChEMBLdb17db\"@en ;\n \
    dct:description \"ChEMBL17 database distribution is a database of bioactive compounds, their quantitative properties and bioactivities (binding constants, pharmacology and ADMET, etc). The data is abstracted and curated from the primary scientific literature.\"@en ;\n \
    dct:created \"2013-08\"^^xsd:gYearMonth;\n \
    pav:createdOn \"2013-08\"^^xsd:gYearMonth;\n \
    pav:authoredOn \"2013-07\"^^xsd:gYearMonth;\n \
    pav:curatedOn \"2013-07\"^^xsd:gYearMonth;\n \
    dct:creator :ebi ;\n \
    dct:contributor :annaGaulton ;\n \
    pav:createdBy <http://orcid.org/0000-0002-8011-0300> ;\n \
    pav:authoredBy :annaGaulton ;\n \
    pav:curatedBy :annaGaulton ;\n \
    dct:issued \"2013-08-29\"^^xsd:date ;\n \
    dct:publisher :ebi ;\n \
    foaf:page <http://www.ebi.ac.uk/chembl/> ;\n \
    schemaorg:logo <http://www.ebi.ac.uk/rdf/sites/ebi.ac.uk.rdf/files/resize/images/rdf/chembl_service_logo-146x48.gif> ;\n \
    dct:license <http://creativecommons.org/licenses/by-sa/3.0/> ;\n \
    dct:rights \"\"\"The data in ChEMBL is covered by the Creative Commons By Attribution. Under the -BY clause, we request attribution for subsequent use of ChEMBL. For publications using ChEMBL data, the primary current citation is:\n \
\n \
1. A. Gaulton, L. Bellis, J. Chambers, M. Davies, A. Hersey, Y. Light, S. McGlinchey, R. Akhtar, A.P. Bento, B. Al-Lazikani, D. Michalovich, & J.P. Overington (2012) \'ChEMBL: A Large-scale Bioactivity Database For Chemical Biology and Drug Discovery\' Nucl. Acids Res. Database Issue. 40 D1100-1107 DOI:10.1093/nar/gkr777 PMID:21948594\n \
\n \
If ChEMBL is incorporated into other works, we ask that the ChEMBL IDs are preserved, and that the release number of ChEMBL is clearly displayed.\"\"\"@en ;\n \
    dct:language <http://lexvo.org/id/iso639-3/eng> ;\n \
    dcat:theme ncit:C48807 ;\n \
    dcat:keyword \"assay\"^^xsd:string, \"chemical\"^^xsd:string ;\n \
    ##Vocabulary does not make sense for a non-RDF dataset\n \
    dct:conformsTo <http://www.w3.org/2001/sw/hcls/notes/hcls-dataset/> ;\n \
    dct:references <http://dx.doi.org/10.1093/bioinformatics/btt765> ;\n \
    rdfs:seeAlso <http://en.wikipedia.org/wiki/ChEMBL> ;\n \
    cito:citesAsAuthority <http://nar.oxfordjournals.org/content/40/D1/D1100> ;\n \
#Identifiers\n \
    idot:preferredPrefix \"chembl\" ;\n \
    idot:alternatePrefix \"chembldb\" ;\n \
    idot:identifierPattern \"CHEMBL\\\\d+\"^^xsd:string ;\n \
    ###void:uriRegexPattern does not make sense for a non-RDF resource\n \
    idot:accessPattern \"http://bio2rdf.org/chembl\", \"http://identifiers.org/chembl.compound/\", \"http://linkedchemistry.info/chembl/chemblid\", \"http://www.ebi.ac.uk/chembl/compound/inspect/\" ;\n \
    idot:exampleIdentifier \"CHEMBL25\"^^xsd:string ;\n \
    ###void:exampleResource does not make sense for a non-RDF resource\n \
#Provenance and Change\n \
    ###sio:has-data-item-in not used for non-RDF resources\n \
    pav:version \"17\"^^xsd:string, \"17.0\" ;\n \
    pav:previousVersion :chembl16db ;\n \
    dct:source :pubchem-bioassay-09-01-2014 ;\n \
    pav:retrievedFrom <http://example.com/madeUp/forExample> ;\n \
    prov:wasDerivedFrom <http://example.com/madeUp/forExample> ;\n \
    pav:createdWith <http://example.com/madeUp/editor> ;\n \
#Availability/Distributions\n \
    dct:format \"application/sql\" ;\n \
    dcat:accessURL <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBLdb/releases/chembl_17/> ;\n \
    dcat:landingPage <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBLdb/releases/chembl_17/chembl_17_release_notes.txt> ;\n \
    dcat:downloadURL <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBLdb/releases/chembl_17/chembl_17_mysql.tar.gz> ;\n \
    dcat:byteSize \"861443887\"^^xsd:decimal ;\n \
    ###void:dataDump does not make sense for a non-RDF resource\n \
#Statistics\n \
    ### Current definitions do not make sense for a non-RDF resource\n \
.\n \
\n \
###RDF Distribution description (Complete)\n \
:chembl17rdf\n \
    a dctypes:Dataset, dcat:Distribution, void:Dataset ;\n \
    dct:title \"ChEMBL Version 17 RDF Distribution\"@en ;\n \
    dct:alternative \"ChEMBLdb17rdf\"@en ;\n \
    dct:description \"ChEMBL17 RDF distribution is a database of bioactive compounds, their quantitative properties and bioactivities (binding constants, pharmacology and ADMET, etc). The data is abstracted and curated from the primary scientific literature.\"@en ;\n \
    dct:created \"2013-08\"^^xsd:gYearMonth;\n \
    pav:createdOn \"2013-08\"^^xsd:gYearMonth;\n \
    pav:authoredOn \"2013-07\"^^xsd:gYearMonth;\n \
    pav:curatedOn \"2013-07\"^^xsd:gYearMonth;\n \
    dct:creator :ebi ;\n \
    dct:contributor :annaGaulton ;\n \
    pav:createdBy <http://orcid.org/0000-0002-8011-0300> ;\n \
    pav:authoredBy :annaGaulton ;\n \
    pav:curatedBy :annaGaulton ;\n \
    dct:issued \"2013-08-29\"^^xsd:date ;\n \
    dct:publisher :ebi ;\n \
    foaf:page <http://www.ebi.ac.uk/chembl/> ;\n \
    schemaorg:logo <http://www.ebi.ac.uk/rdf/sites/ebi.ac.uk.rdf/files/resize/images/rdf/chembl_service_logo-146x48.gif> ;\n \
    dct:license <http://creativecommons.org/licenses/by-sa/3.0/> ;\n \
    dct:rights \"\"\"The data in ChEMBL is covered by the Creative Commons By Attribution. Under the -BY clause, we request attribution for subsequent use of ChEMBL. For publications using ChEMBL data, the primary current citation is:\n \
\n \
1. A. Gaulton, L. Bellis, J. Chambers, M. Davies, A. Hersey, Y. Light, S. McGlinchey, R. Akhtar, A.P. Bento, B. Al-Lazikani, D. Michalovich, & J.P. Overington (2012) \'ChEMBL: A Large-scale Bioactivity Database For Chemical Biology and Drug Discovery\' Nucl. Acids Res. Database Issue. 40 D1100-1107 DOI:10.1093/nar/gkr777 PMID:21948594\n \
\n \
If ChEMBL is incorporated into other works, we ask that the ChEMBL IDs are preserved, and that the release number of ChEMBL is clearly displayed.\"\"\"@en ;\n \
    dct:language <http://lexvo.org/id/iso639-3/eng> ;\n \
    dcat:theme ncit:C48807 ;\n \
    dcat:keyword \"assay\"^^xsd:string, \"chemical\"^^xsd:string ;\n \
    void:vocabulary <http://purl.org/dc/terms/>, <http://rdf.ebi.ac.uk/terms/chembl#>, <http://www.w3.org/ns/dcat#> ;\n \
    dct:conformsTo <http://www.w3.org/2001/sw/hcls/notes/hcls-dataset/> ;\n \
    dct:references <http://dx.doi.org/10.1093/bioinformatics/btt765> ;\n \
    rdfs:seeAlso <http://en.wikipedia.org/wiki/ChEMBL> ;\n \
    cito:citesAsAuthority <http://nar.oxfordjournals.org/content/40/D1/D1100> ;\n \
    void:subset :chembl17_rdf_molecule_dataset, :chembl17_rdf_target_dataset ;\n \
#Identifiers\n \
    idot:preferredPrefix \"chembl\" ;\n \
    idot:alternatePrefix \"chembldb\" ;\n \
    idot:identifierPattern \"CHEMBL\\\\d+\"^^xsd:string ;\n \
    void:uriRegexPattern \"http://rdf.ebi.ac.uk/resource/chembl/target/CHEMBL\\\\d+\" ;\n \
    idot:accessPattern \"http://bio2rdf.org/chembl\", \"http://identifiers.org/chembl.compound/\", \"http://linkedchemistry.info/chembl/chemblid\", \"http://www.ebi.ac.uk/chembl/compound/inspect/\" ;\n \
    idot:exampleIdentifier \"CHEMBL25\"^^xsd:string ;\n \
    void:exampleResource <http://rdf.ebi.ac.uk/resource/chembl/compound/CHEMBL25> ;\n \
#Provenance and Change\n \
    #Only one data item given for the purpose of the example, all resources should be listed\n \
    sio:has-data-item <http://rdf.ebi.ac.uk/resource/chembl/compound/CHEMBL25> ;\n \
    pav:version \"17\"^^xsd:string, \"17.0\" ;\n \
    pav:previousVersion :chembl16rdf ;\n \
    dct:source :pubchem-bioassay-09-01-2014 ;\n \
    pav:retrievedFrom :pubchem-bioassay-09-01-2014 ;\n \
    prov:wasDerivedFrom :pubchem-bioassay-09-01-2014 ;\n \
    pav:createdWith :chembl-sql2rdf-exporter-v1 ;\n \
#Availability/Distributions\n \
    dct:format <http://www.w3.org/ns/formats/Turtle>, \"application/gzip\", \"text/turtle\" ;\n \
    dcat:accessURL <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBL-RDF/17.0/chembl_17/> ;\n \
    dcat:landingPage <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBL-RDF/17.0/chembl_17/chembl_17_release_notes.txt> ;\n \
    dcat:downloadURL <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBL-RDF/17.0/chembl_17/chembl_17_molecule.ttl.gz> ;\n \
    void:dataDump <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBL-RDF/17.0/chembl_17_molecule.ttl.gz> ;\n \
    void:subset :chembl17-uniprot-exactMatch-linkset ;\n \
  #Statistics: Note that numbers are taken from Bio2RDF release 3\n \
      void:triples \"409942525\"^^xsd:integer ;\n \
      void:entities \"50061452\"^^xsd:integer ;\n \
      void:distinctSubjects \"50062405\"^^xsd:integer ;\n \
      void:properties \"141\"^^xsd:integer ;\n \
      void:distinctObjects \"50128234\"^^xsd:integer ;\n \
      #Number of unique classes\n \
      void:classPartition [\n \
          void:class rdfs:Class ;\n \
          void:distinctSubjects \"110\"^^xsd:integer\n \
      ] ;\n \
      #Number of unique literals\n \
      void:classPartition [\n \
          void:class rdfs:Literal ;\n \
          void:distinctSubjects \"58067345\"^^xsd:integer\n \
      ] ;\n \
      #Number of graphs\n \
      void:classPartition [\n \
          void:class sd:Graph ;\n \
          void:distinctSubjects \"8\"^^xsd:integer\n \
      ] ;\n \
  #Enhanced Statistics\n \
      #Class and number of instances\n \
      void:classPartition [\n \
        void:class <http://rdf.ebi.ac.uk/terms/chembl#Activity> ;\n \
        void:distinctSubjects \"12419715\"^^xsd:integer\n \
      ] ;\n \
\n \
      # Property and number of triples\n \
      void:propertyPartition [\n \
        void:property <http://rdf.ebi.ac.uk/terms/chembl#hasActivity> ;\n \
        void:triples \"37259145\"^^xsd:integer\n \
      ] ;\n \
\n \
      # Property, triples, and number of unique subjects of a certain type\n \
      void:propertyPartition [\n \
        void:property <http://rdf.ebi.ac.uk/terms/chembl#hasMolecule> ;\n \
        void:triples \"12419715\"^^xsd:integer ;\n \
        void:classPartition [\n \
          void:class <http://rdf.ebi.ac.uk/terms/chembl#Activity> ;\n \
          void:distinctSubjects \"12419715\"^^xsd:integer ;\n \
      ]] ;\n \
\n \
      # Property, triples, and number of unique objects of a certain type\n \
      void:propertyPartition [\n \
        void:property <http://rdf.ebi.ac.uk/terms/chembl#hasActivity> ;\n \
        void:triples \"37259145\"^^xsd:integer ;\n \
        void-ext:objectClassPartition [\n \
          void:class <http://rdf.ebi.ac.uk/terms/chembl#Activity> ;\n \
          void:distinctObjects \"12419715\"^^xsd:integer\n \
      ]] ;\n \
\n \
      # Property, triples, and number of unique literals\n \
      void:propertyPartition [\n \
        void:property <http://www.w3.org/2004/02/skos/core#prefLabel> ;\n \
        void:triples \"1360455\"^^xsd:integer ;\n \
        void-ext:objectClassPartition [\n \
          void:class rdfs:Literal;\n \
          void:distinctObjects \"1359785\"^^xsd:integer\n \
      ]] ;\n \
\n \
      # Property, triples, and number of unique subjects and objects of a certain type\n \
      void:propertyPartition [\n \
        void:property <http://rdf.ebi.ac.uk/terms/chembl#hasAssay> ;\n \
        void:triples \"12419715\"^^xsd:integer ;\n \
        void:classPartition [\n \
            void:class <http://rdf.ebi.ac.uk/terms/chembl#Activity> ;\n \
            void:distinctSubjects \"12419715\"^^xsd:integer ;\n \
        ];\n \
        void-ext:objectClassPartition [\n \
          void:class <http://rdf.ebi.ac.uk/terms/chembl#Assay> ;\n \
          void:distinctObjects \"1042288\"^^xsd:integer ;\n \
      ]] ;\n \
.\n \
\n \
<http://www.ebi.ac.uk/chembl/compound/inspect/>\n \
    idot:primarySource true ;\n \
    dct:format \"text/html\" ;\n \
    dct:publisher <http://www.ebi.ac.uk> ;\n \
    idot:accessIdentifierPattern \"^http://www.ebi.ac.uk/chembl/compound/inspect/CHEMBL\\\\d+\" ;\n \
    a idot:AccessPattern .\n \
\n \
<http://identifiers.org/chembl.compound/>\n \
    dct:format \"text/html\" ;\n \
    idot:accessIdentifierPattern \"^http://identifiers.org/chembl.compound/CHEMBL\\\\d+\" ;\n \
    a idot:AccessPattern .\n \
\n \
<http://bio2rdf.org/chembl:>\n \
    dct:format \"application/rdf+xml\" ;\n \
    dct:publisher <http://bio2rdf.org> ;\n \
    idot:accessIdentifierPattern \"^http://bio2rdf.org/chembl:CHEMBL\\\\d+\" ;\n \
    a idot:AccessPattern .\n \
\n \
<http://linkedchemistry.info/chembl/chemblid>\n \
    dct:format \"application/rdf+xml\" ;\n \
    idot:accessIdentifierPattern \"^http://linkedchemistry.info/chembl/CHEMBL\\\\d+\" ;\n \
    a idot:AccessPattern .\n \
\n \
:chembl17-uniprot-exactMatch-linkset\n \
###Linkset specific metadata\n \
    a void:Linkset ;\n \
    void:subjectsTarget :chembl-rdf ;\n \
    void:objectsTarget <http://purl.uniprot.org/void#UniProtDataset_2015_03> ;\n \
    void:linkPredicate skos:exactMatch ;\n \
    void:triples \"6367\"^^xsd:integer ;\n \
##Metadata for a RDF distribution\n \
    a dctypes:Dataset, dcat:Distribution, void:Dataset ;\n \
    dct:title \"ChEMBL Target Component to UniProt Protein Exact Match Linkset\"@en ;\n \
    dct:alternative \"ChEMBLTargetCmpt2UniProtEMLS\"@en ;\n \
    dct:description \"A linkset connecting ChEMBL target components with their corresponding UniProt protein entry where the match is deemed to be exact.\"@en ;\n \
    dct:created \"2013-08\"^^xsd:gYearMonth;\n \
    pav:createdOn \"2013-08\"^^xsd:gYearMonth;\n \
    pav:authoredOn \"2013-07\"^^xsd:gYearMonth;\n \
    pav:curatedOn \"2013-07\"^^xsd:gYearMonth;\n \
    dct:creator :ebi ;\n \
    dct:contributor :annaGaulton ;\n \
    pav:createdBy <http://orcid.org/0000-0002-8011-0300> ;\n \
    pav:authoredBy :annaGaulton ;\n \
    pav:curatedBy :annaGaulton ;\n \
    dct:issued \"2013-08-29\"^^xsd:date ;\n \
    dct:publisher :ebi ;\n \
    foaf:page <http://www.ebi.ac.uk/chembl/> ;\n \
    schemaorg:logo <http://www.ebi.ac.uk/rdf/sites/ebi.ac.uk.rdf/files/resize/images/rdf/chembl_service_logo-146x48.gif> ;\n \
    dct:license <http://creativecommons.org/licenses/by-sa/3.0/> ;\n \
    dct:rights \"\"\"The data in ChEMBL is covered by the Creative Commons By Attribution. Under the -BY clause, we request attribution for subsequent use of ChEMBL. For publications using ChEMBL data, the primary current citation is:\n \
\n \
1. A. Gaulton, L. Bellis, J. Chambers, M. Davies, A. Hersey, Y. Light, S. McGlinchey, R. Akhtar, A.P. Bento, B. Al-Lazikani, D. Michalovich, & J.P. Overington (2012) \'ChEMBL: A Large-scale Bioactivity Database For Chemical Biology and Drug Discovery\' Nucl. Acids Res. Database Issue. 40 D1100-1107 DOI:10.1093/nar/gkr777 PMID:21948594\n \
\n \
If ChEMBL is incorporated into other works, we ask that the ChEMBL IDs are preserved, and that the release number of ChEMBL is clearly displayed.\"\"\"@en ;\n \
    dct:language <http://lexvo.org/id/iso639-3/eng> ;\n \
    dcat:theme ncit:C17021 ;\n \
    dcat:keyword \"assay\"^^xsd:string, \"protein\"^^xsd:string ;\n \
    void:vocabulary <http://purl.org/dc/terms/>, <http://rdf.ebi.ac.uk/terms/chembl#>, <http://www.w3.org/ns/dcat#> ;\n \
    dct:conformsTo <http://www.w3.org/2001/sw/hcls/notes/hcls-dataset/> ;\n \
    dct:references <http://dx.doi.org/10.1093/bioinformatics/btt765> ;\n \
    rdfs:seeAlso <http://en.wikipedia.org/wiki/ChEMBL> ;\n \
    cito:citesAsAuthority <http://nar.oxfordjournals.org/content/40/D1/D1100> ;\n \
#Identifiers\n \
    idot:preferredPrefix \"chembl\" ;\n \
    idot:alternatePrefix \"chembldb\" ;\n \
    idot:identifierPattern \"CHEMBL\\\\d+\"^^xsd:string ;\n \
    void:uriRegexPattern \"http://rdf.ebi.ac.uk/resource/chembl/target/CHEMBL\\\\d+\" ;\n \
    idot:accessPattern \"http://bio2rdf.org/chembl\", \"http://identifiers.org/chembl.compound/\", \"http://linkedchemistry.info/chembl/chemblid\", \"http://www.ebi.ac.uk/chembl/compound/inspect/\" ;\n \
    idot:exampleIdentifier \"CHEMBL_TC_4803\"^^xsd:string ;\n \
    void:exampleResource <http://rdf.ebi.ac.uk/resource/chembl/targetcomponent/CHEMBL_TC_4803> ;\n \
#Provenance and Change\n \
    #Only one data item given for the purpose of the example, all resources should be listed\n \
    sio:has-data-item <http://rdf.ebi.ac.uk/resource/chembl/targetcomponent/CHEMBL_TC_4803> ;\n \
    pav:version \"17\"^^xsd:string, \"17.0\" ;\n \
    pav:previousVersion :chembl16-uniprot-exactMatch-linkset ;\n \
    dct:source :pubchem-bioassay-09-01-2014 ;\n \
    pav:retrievedFrom :pubchem-bioassay-09-01-2014 ;\n \
    prov:wasDerivedFrom :pubchem-bioassay-09-01-2014 ;\n \
    pav:createdWith :chembl-sql2rdf-exporter-v1 ;\n \
#Availability/Distributions\n \
    dct:format <http://www.w3.org/ns/formats/Turtle>, \"application/gzip\", \"text/turtle\" ;\n \
    dcat:accessURL <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBL-RDF/17.0/chembl_17/> ;\n \
    dcat:landingPage <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBL-RDF/17.0/chembl_17/chembl_17_release_notes.txt> ;\n \
    dcat:downloadURL <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBL-RDF/17.0/chembl_17.0_targetcmpt_uniprot_ls.ttl.gz> ;\n \
    void:dataDump <ftp://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBL-RDF/17.0/chembl_17.0_targetcmpt_uniprot_ls.ttl.gz> ;\n \
.';

var schema = 'PREFIX cito: <http://purl.org/spar/cito/>\n \
PREFIX dcat: <http://www.w3.org/ns/dcat#>\n \
PREFIX dct: <http://purl.org/dc/terms/>\n \
PREFIX dctypes: <http://purl.org/dc/dcmitype/>\n \
PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n \
PREFIX freq: <http://purl.org/cld/freq/>\n \
PREFIX idot: <http://identifiers.org/idot/>\n \
PREFIX lexvo: <http://lexvo.org/id/iso639-3/>\n \
PREFIX pav: <http://purl.org/pav/>\n \
PREFIX prov: <http://www.w3.org/ns/prov#>\n \
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n \
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n \
PREFIX schemaorg: <http://schema.org/>\n \
PREFIX sd: <http://www.w3.org/ns/sparql-service-description#>\n \
PREFIX sio: <http://semanticscience.org/resource/>\n \
PREFIX void: <http://rdfs.org/ns/void#>\n \
PREFIX void-ext: <http://ldf.fi/void-ext#>\n \
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n \
\n \
<SummaryLevelShape> {\n \
#Core\n \
    rdf:type (dctypes:Dataset),\n \
    !rdf:type (void:Dataset),\n \
    !rdf:type (dcat:Distribution),\n \
    dct:title rdf:langString,\n \
    ###dct:alternative rdf:langString, is a MAY property\n \
    dct:description rdf:langString,\n \
    !dct:creator .,\n \
    !pav:createBy .,\n \
    !dct:contributor .,\n \
    !pav:authoredBy .,\n \
    !pav:curatedBy .,\n \
    !dct:created .,\n \
    !pav:createdOn .,\n \
    !pav:authoredOn .,\n \
    !pav:curatedOn .,\n \
    dct:publisher IRI,\n \
    !dct:issued .,\n \
    (foaf:page IRI)?,\n \
    (schemaorg:logo IRI)?,\n \
    (dct:license IRI)* , ### License is now a MAY property\n \
    ###dct:rights rdf:langString, ### Rights is a MAY property\n \
    !dct:language .,\n \
    ###dcat:theme IRI*, ### Theme is a MAY property, should match something that is a skos:Concept\n \
    ###dcat:keyword xsd:string, ### Keyword is a MAY property\n \
    !void:vocabulary .,\n \
    !dct:conformsTo .,\n \
    ###dct:references IRI, ###MAY property\n \
    ###cito:citesAsAuthority IRI, ### citation is a MAY property\n \
    ###rdfs:seeAlso IRI, ###MAY property\n \
    ###dct:hasPart IRI, ###part is a MAY property, what should be the shape of the description it matches?\n \
    !void:subset .,\n \
#Identifiers\n \
    ###idot:preferredPrefix xsd:string, ### Preferred prefix is a MAY property\n \
    ###idot:alternatePrefix xsd:string, ### Alternate prefix is a MAY property\n \
    !idot:identifierPattern .,\n \
    !void:uriRegexPattern .,\n \
    !idot:accessPattern ., ### Access pattern is a MAY property\n \
    !idot:exampleIdentifier .,\n \
    !void:exampleResource .,\n \
#Provenance and Change\n \
    !void:inDataset .,\n \
    !sio:has-data-item .,\n \
    !pav:version .,\n \
    !dct:isVersionOf .,\n \
    !pav:previousVersion .,\n \
    ###pav:hasCurrentVersion IRI, ###  is a MAY property, should this match an @VersionShape?\n \
    !dct:source .,\n \
    !pav:retrievedFrom .,\n \
    !prov:wasDerivedFrom .,\n \
    !pav:createdWith .,\n \
    dct:accrualPeriodicity IRI?,###freq:~?, ###TODO Check freq:~ is the correct syntax\n \
#Availability/Distributions\n \
    !dcat:distribution .,\n \
    !dcat:landingPage .,\n \
    !dct:format .,\n \
    ###dcat:accessURL IRI, ### is a MAY property\n \
    !dcat:downloadURL .,\n \
    !void:dataDump .,\n \
    (void:sparqlEndpoint IRI)?,\n \
#Statistics\n \
    !void:triples .,\n \
    !void:entities .,\n \
    !void:distinctSubjects .,\n \
    !void:properties .,\n \
    !void:distinctObjects .,\n \
    !void:classPartition .,\n \
    !void:propertyPartition .,\n \
    !void:subset .\n \
}\n \
\n \
<VersionLevelShape> {\n \
#Core\n \
    rdf:type (dctypes:Dataset),\n \
    !rdf:type (void:Dataset),\n \
    !rdf:type (dcat:Distribution),\n \
    dct:title rdf:langString,\n \
    ###dct:alternative rdf:langString, is a MAY property\n \
    dct:description rdf:langString,\n \
    (dct:creator IRI | pav:createdBy IRI)+,\n \
    ###(dct:contributor IRI | pav:authoredBy IRI | pav:curatedBy IRI)+, MAY property\n \
    ###TODO add test that one of created or issued is present\n \
    (dct:created xsd:date | dct:created  xsd:dateTime | dct:created xsd:gYearMonth | dct:created xsd:gYear | pav:createdOn xsd:dateTime)?,\n \
    ###pav:createdOn xsd:date | pav:createdOn  xsd:dateTime | pav:createdOn xsd:gYearMonth | pav:createdOn xsd:gYear, ###MAY property\n \
    ###pav:authoredOn xsd:date | pav:authoredOn  xsd:dateTime | pav:authoredOn xsd:gYearMonth | pav:authoredOn xsd:gYear, ###MAY property\n \
    ###pav:curatedOn xsd:date | pav:curatedOn  xsd:dateTime | pav:curatedOn xsd:gYearMonth | pav:curatedOn xsd:gYear, ###MAY property\n \
    dct:publisher IRI,\n \
    (dct:issued xsd:date | dct:issued xsd:dateTime | dct:issued xsd:gYearMonth | dct:issued xsd:gYear)?,\n \
    (foaf:page IRI)?,\n \
    (schemaorg:logo IRI)?,\n \
    (dct:license IRI)+ , ### License is SHOULD property, but multiple allowed\n \
    ###dct:rights rdf:langString, ### Rights is a MAY property\n \
    (dct:language .)*, ###TODO define the object\n \
    ###dcat:theme IRI*, ### Theme is a MAY property, should match something that is a skos:Concept\n \
    ###dcat:keyword xsd:string, ### Keyword is a MAY property\n \
    !void:vocabulary .,\n \
    ###dct:conformsTo IRI, ###MAY property\n \
    ###dct:references IRI, ###MAY property\n \
    ###cito:citesAsAuthority IRI, ### citation is a MAY property\n \
    ###rdfs:seeAlso IRI, ###MAY property\n \
    ###dct:hasPart IRI, ###part is a MAY property, what should be the shape of the description it matches?\n \
    !void:subset .,\n \
#Identifiers\n \
    ###idot:preferredPrefix xsd:string, ### Preferred prefix is a MAY property\n \
    ###idot:alternatePrefix xsd:string, ### Alternate prefix is a MAY property\n \
    !idot:identifierPattern .,\n \
    !void:uriRegexPattern .,\n \
    !idot:accessPattern .,\n \
    !idot:exampleIdentifier .,\n \
    !void:exampleResource .,\n \
#Provenance and Change\n \
    !sio:has-data-item .,\n \
    !void:inDataset .,\n \
    pav:version xsd:string,\n \
    dct:isVersionOf IRI,\n \
    (pav:previousVersion IRI)?,\n \
    !pav:hasCurrentVersion .,\n \
    (dct:source IRI | pav:retrievedFrom IRI | prov:wasDerivedFrom IRI | pav:createdWith .)+,\n \
    !dct:accrualPeriodicity . ,\n \
#Availability/Distributions\n \
    (dcat:distribution IRI)*, ###TODO restrict the shape of the IRI but could be hard to test in practice\n \
    ###dcat:landingPage IRI, ###MAY property\n \
    !dct:format .,\n \
    ###dcat:accessURL IRI, ### is a MAY property\n \
    !dcat:downloadURL .,\n \
    !void:dataDump .,\n \
    !void:sparqlEndpoint ., ###SHOULD NOT being strict here\n \
#Statistics\n \
    !void:triples .,\n \
    !void:entities .,\n \
    !void:distinctSubjects .,\n \
    !void:properties .,\n \
    !void:distinctObjects .,\n \
    !void:classPartition .,\n \
    !void:propertyPartition .,\n \
    !void:subset .\n \
}\n \
\n \
<DistributionLevelShape> {\n \
#Core\n \
    (rdf:type (dctypes:Dataset))?,\n \
    ###RDF datasets are being validated separately\n \
    !rdf:type (void:Dataset),\n \
    rdf:type (dcat:Distribution),\n \
    dct:title rdf:langString,\n \
    ###dct:alternative rdf:langString, is a MAY property\n \
    dct:description rdf:langString,\n \
    (dct:creator IRI | pav:createdBy IRI)+,\n \
    ###(dct:contributor IRI | pav:authoredBy IRI | pav:curatedBy IRI)+, MAY property\n \
    ###TODO add test that one of created or issued is present\n \
    (dct:created xsd:date | dct:created  xsd:dateTime | dct:created xsd:gYearMonth | dct:created xsd:gYear | pav:createdOn xsd:dateTime)?,\n \
    ###pav:createdOn xsd:date | pav:createdOn  xsd:dateTime | pav:createdOn xsd:gYearMonth | pav:createdOn xsd:gYear, ###MAY property\n \
    ###pav:authoredOn xsd:date | pav:authoredOn  xsd:dateTime | pav:authoredOn xsd:gYearMonth | pav:authoredOn xsd:gYear, ###MAY property\n \
    ###pav:curatedOn xsd:date | pav:curatedOn  xsd:dateTime | pav:curatedOn xsd:gYearMonth | pav:curatedOn xsd:gYear, ###MAY property\n \
    dct:publisher IRI,\n \
    (dct:issued xsd:date | dct:issued xsd:dateTime | dct:issued xsd:gYearMonth | dct:issued xsd:gYear)?,\n \
    (foaf:page IRI)?,\n \
    (schemaorg:logo IRI)?,\n \
    (dct:license IRI)+ , ### License is MUST property, but multiple allowed\n \
    ###dct:rights rdf:langString, ### Rights is a MAY property\n \
    (dct:language .)*, ###TODO define the object\n \
    ###dcat:theme IRI*, ### Theme is a MAY property, should match something that is a skos:Concept\n \
    ###dcat:keyword xsd:string*, ### Keyword is a MAY property\n \
    !void:vocabulary .,\n \
    (dct:conformsTo IRI)?,\n \
    ###dct:references IRI, ###MAY property\n \
    ###cito:citesAsAuthority IRI, ### citation is a MAY property\n \
    ###rdfs:seeAlso IRI, ###MAY property\n \
    !dct:hasPart .,\n \
    !void:subset ., ### Not for a non-RDF dataset\n \
#Identifiers\n \
    ###idot:preferredPrefix xsd:string, ### Preferred prefix is a MAY property\n \
    ###idot:alternatePrefix xsd:string, ### Alternate prefix is a MAY property\n \
    ###idot:identifierPattern xsd:string, ###MAY property\n \
    !void:uriRegexPattern ., ### Not for an non-RDF dataset\n \
    ###idot:accessPattern idot:AccessPattern, ### Access pattern is a MAY property\n \
    (idot:exampleIdentifier xsd:string)*,\n \
    !void:exampleResource ., ### Not for an non-RDF dataset\n \
#Provenance and Change\n \
    !sio:has-data-item ., ###Only for RDF dataset\n \
    !void:inDataset ., ### Not for a non-RDF dataset\n \
    (pav:version xsd:string)?,\n \
    !dct:isVersionOf .,\n \
    (pav:previousVersion IRI)?,\n \
    !pav:hasCurrentVersion .,\n \
    (dct:source IRI | pav:retrievedFrom IRI | prov:wasDerivedFrom IRI | pav:createdWith IRI)*,\n \
    !dct:accrualPeriodicity . ,\n \
#Availability/Distributions\n \
    !dcat:distribution .,\n \
    ###dcat:landingPage IRI,###MAY property\n \
    (dct:format IRI | dct:format xsd:string),\n \
    ###dcat:accessURL IRI, ### is a MAY property\n \
    (dcat:downloadURL IRI)?,\n \
    !void:dataDump .,  ### Not for a non-RDF dataset\n \
    !void:sparqlEndpoint ., #Applying strict semantics here\n \
#Statistics\n \
    !void:triples .,  ### Not for a non-RDF dataset\n \
    !void:entities ., ### Not for a non-RDF dataset\n \
    !void:distinctSubjects ., ### Not for a non-RDF dataset\n \
    !void:properties ., ### Not for a non-RDF dataset\n \
    !void:distinctObjects ., ### Not for a non-RDF dataset\n \
    !void:classPartition ., ### Not for a non-RDF dataset\n \
    !void:propertyPartition ., ### Not for a non-RDF dataset\n \
    !void:subset . ### Not for a non-RDF dataset\n \
}\n \
\n \
<RDFDistributionLevelShape> {\n \
#Core\n \
    (rdf:type (dctypes:Dataset))?,\n \
    rdf:type (void:Dataset),\n \
    rdf:type (dcat:Distribution),\n \
    dct:title rdf:langString,\n \
    ###dct:alternative rdf:langString, is a MAY property\n \
    dct:description rdf:langString,\n \
    (dct:creator IRI | pav:createdBy IRI)+,\n \
    ###(dct:contributor IRI | pav:authoredBy IRI | pav:curatedBy IRI)+, MAY property\n \
    ###TODO add test that one of created or issued is present\n \
    (dct:created xsd:date | dct:created  xsd:dateTime | dct:created xsd:gYearMonth | dct:created xsd:gYear | pav:createdOn xsd:dateTime)?,\n \
    ###pav:createdOn xsd:date | pav:createdOn  xsd:dateTime | pav:createdOn xsd:gYearMonth | pav:createdOn xsd:gYear, ###MAY property\n \
    ###pav:authoredOn xsd:date | pav:authoredOn  xsd:dateTime | pav:authoredOn xsd:gYearMonth | pav:authoredOn xsd:gYear, ###MAY property\n \
    ###pav:curatedOn xsd:date | pav:curatedOn  xsd:dateTime | pav:curatedOn xsd:gYearMonth | pav:curatedOn xsd:gYear, ###MAY property\n \
    dct:publisher IRI,\n \
    (dct:issued xsd:date | dct:issued xsd:dateTime | dct:issued xsd:gYearMonth | dct:issued xsd:gYear)?,\n \
    (foaf:page IRI)?,\n \
    (schemaorg:logo IRI)?,\n \
    (dct:license IRI)+ , ### License is MUST property, but multiple allowed\n \
    ###dct:rights rdf:langString, ### Rights is a MAY property\n \
    (dct:language .)*, ###TODO define the object\n \
    ###dcat:theme IRI*, ### Theme is a MAY property, should match something that is a skos:Concept\n \
    ###dcat:keyword xsd:string*, ### Keyword is a MAY property\n \
    void:vocabulary IRI*,\n \
    (dct:conformsTo IRI)?,\n \
    ###dct:references IRI, ###MAY property\n \
    ###cito:citesAsAuthority IRI, ### citation is a MAY property\n \
    ###rdfs:seeAlso IRI, ###MAY property\n \
    !dct:hasPart .,\n \
    !void:subset ., ### Not for a non-RDF dataset\n \
#Identifiers\n \
    ###idot:preferredPrefix xsd:string, ### Preferred prefix is a MAY property\n \
    ###idot:alternatePrefix xsd:string, ### Alternate prefix is a MAY property\n \
    ###idot:identifierPattern xsd:string, ###MAY property\n \
    ###void:uriRegexPattern xsd:string, ### May property\n \
    ###idot:accessPattern idot:AccessPattern, ### Access pattern is a MAY property\n \
    (idot:exampleIdentifier xsd:string)*,\n \
    (void:exampleResource IRI)*,\n \
#Provenance and Change\n \
    ###(sio:has-data-item IRI)*, ###MAY property\n \
    (pav:version xsd:string)?,\n \
    !dct:isVersionOf .,\n \
    (pav:previousVersion IRI)?,\n \
    !pav:hasCurrentVersion .,\n \
    (dct:source IRI | pav:retrievedFrom IRI | prov:wasDerivedFrom IRI | pav:createdWith IRI)*,\n \
    !dct:accrualPeriodicity . ,\n \
#Availability/Distributions\n \
    !dcat:distribution .,\n \
    ###dcat:landingPage IRI,###MAY property\n \
    (dct:format IRI | dct:format xsd:string), ###Could limit the string to an RDF format\n \
    ###dcat:accessURL IRI, ### is a MAY property\n \
    (dcat:downloadURL IRI)?,\n \
    (void:dataDump IRI)?,\n \
    !void:sparqlEndpoint ., #Applying strict semantics here\n \
#Statistics\n \
    (void:triples xsd:integer)?,\n \
    (void:entities xsd:integer)?,\n \
    (void:distinctSubjects xsd:integer)?,\n \
    (void:properties xsd:integer)?,\n \
    (void:distinctObjects xsd:integer)?,\n \
    ### Number of classes\n \
    (void:classPartition @<NumberOfClassesShape>)?,\n \
    ### Number of graphs\n \
    (void:classPartition @<NumberofGraphsShape>)?\n \
#Enhanced Statistics\n \
    ###Not validating these!!!\n \
    ###MAY properties\n \
}\n \
\n \
<NumberOfClassesShape> {\n \
    void:class rdfs:Class ,\n \
    void:distinctSubjects xsd:integer\n \
}\n \
\n \
<NumberOfGraphsShape> {\n \
    void:class sd:Graph ,\n \
    void:distinctSubjects xsd:integer\n \
}\n \
';
