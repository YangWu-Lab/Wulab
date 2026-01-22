## Basic Options {: .expand}
Below is a list of common flags used in OPERA analysis.

### Input/Output
*   `--besd-flist <file>`: Reads a file to get the full paths of the multiple xQTL BESD files.
*   `--gwas-summary <file>`: Reads summary-level data from GWAS.
*   `--bfile <prefix>`: Reads individual-level SNP genotype data (PLINK binary format) as LD reference.
*   `--out <prefix>`: Saves the results with the specified prefix.

### Analysis Control
*   `--thread-num <int>`: Specifies the number of OpenMP threads for parallel computing.
*   `--sample-overlap`: Specifies the flag to let OPERA consider the between-study correlations due to overlapping samples.
*   `--opera-smr`: Turns on the flag of using the estimated SMR effect rather than the estimated joint SMR effect.
*   `--heidi-off`: Turns off the heterogeneity test.

### Thresholds
*   `--thresh-ppa <float>`: Significance threshold of PPA (default: 0.9).
*   `--thresh-smr <float>`: Significance threshold of SMR (default: 0.05).
*   `--thresh-heidi <float>`: Significance threshold of HEIDI test (default: 0.01).