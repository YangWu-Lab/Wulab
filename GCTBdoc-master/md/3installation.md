## Installation {: .expand}

To install OPERA, you can download the [opera_Linux.zip](https://github.com/wuyangf7/OPERA/blob/main/opera_Linux.zip) package, which contains a standalone (i.e., statically linked) 64-bit Linux executable file opera_Linux. We strongly recommend using this static executable because it is well-optimized and no further installation is required.

For compiling yourself, you should clone this repository and use the MAKEFILE,  
```
git clone https://github.com/wuyangf7/OPERA
cd OPERA
make
```
There are dependencies on your local `MKL`, `BOOST` and `EIGEN` Libraries.