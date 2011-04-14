sandman
=======

Sandbox, load, and unload self-contained packages on the fly.

status
======

Not yet ready for general consumption.

Inspirations
============
    * [module](http://modules.sourceforge.net/)
    * nix
    * [npm](http://npmjs.org)
    * apt
    * cabal
    * cpan

hypothetical use cases
======================

install a package from some random website
    $ sandman install http://somesite.net/moo-1.2.3.tar.bz2
    
then uninstall it because it sucks
    $ sandman uninstall moo-1.2.3
    
list the available packages
    $ sandman avail
    
list the loaded packages
    $ sandman list
    
bundle a package moo with its dependencies for remote deployment
    $ sandman bundle moo.sandman
