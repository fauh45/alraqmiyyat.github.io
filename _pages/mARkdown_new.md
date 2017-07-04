---
excerpt:	"The main goal of **OpenITI mARkdown** is to provide a simple system for tagging structural, morphological and semantic elements in premodern and early modern Islamicate texts that are being prepared within the framework of the [OpenITI Project](https://github.com/OpenITI). The use of **OpenITI mARkdown** will allow one to engage in the computational analysis of texts in the same way as more complex and time-consuming tagging schemes (like TEI XML)."
header:
  overlay_image: /images/covers/16022u.jpg
  overlay_filter: rgba(0, 0, 0, 0.5)
  caption: "**Photo credit**: Iraq. (Mesopotamia). Baghdad. River scenes on the Tigris. Tigris river scene showing the Serai and large river boats. *Library of Congress*, [*LC-DIG-matpc-16022*](http://hdl.loc.gov/loc.pnp/matpc.16022)"
layout: single
title: 'OpenITI mARkdown'
description: "Tagging Islamicate Texts"
comments: true
author_profile: true
permalink: /mARkdown_new/
---

{% include toc icon="gears" title="Table of Contents" %}

The main goal of **OpenITI mARkdown** is to provide a simple system for tagging structural, morphological and semantic elements in premodern and early modern Islamicate texts of the [OpenITI corpus](https://github.com/OpenITI). The use of **OpenITI mARkdown** will allow one to engage in the computational analysis of texts in the same way as allowed by the more complex and time-consuming tagging schemes such as TEI XML; **OpenITI mARkdown** will also facilitate the conversion of the large volume of Islamicate texts into TEI XML, which is now the standard format for digital editions. In principle, **OpenITI mARkdown** does not require any special editor, but the current implementation relies on [EditPad Pro](https://www.editpadpro.com/), which supports right-to-left languages, Unicode, and large files. However, it is the support of custom highlighting and navigation schemes that makes this text editor particularly convenient for **OpenITI mARkdown**.

**OpenITI mARkdown** is not meant to be a comprehensive standard, but rather a light-weight tagging scheme that renders texts machine readable and can be adapted to specific research tasks. The scheme consists of a set of unified patterns, but also includes custom patterns that facilitate analysis of specific types of data. These patterns can be divided into structural (unified), morphological (unified, customizable) and semantic (unified customizable, but also custom). The scheme currently accommodates a variety of research inquiries. 

# A Very Brief Intro

1. Texts in **OpenITI** are automatically converted into **OpenITI mARkdown**, and in most cases, only structural tagging is required—in other words, tagging headers of chapters, sections,  subsections and and other logical units. 
1. Download and install [EditPad Pro](http://www.editpadpro.com/). **EditPad Pro** works on Windows only; if you are using Mac or Linux, you can still use it with some virtualization option; the combination of **Parallels**, **Windows 10** and **EditPad Pro** works well on Macs (The size of the virtual machine with **Windows 10** is only about 10-15Gb).
1. Download **OpenITI mARkdown** schemes from GitHub ([https://github.com/OpenITI/mARkdown_scheme](https://github.com/OpenITI/mARkdown_scheme)), and unzip, and copy all the files into `%APPDATA%\JGsoft\EditPad Pro 7` (*Note*: make sure that EditPad Pro in not running: you need to do `File > Exit` to completely close it).
1. The scheme is automatically activated in EditPad Pro by the first line in the file, which must be: `#####OpenITI#` (called *magic value* in EditPad Pro).
1. Texts in the repositories of the [OpenITI Project](https://github.com/OpenITI) have already been preprocessed. Opening any of these texts in EditPad Pro should automatically activate **OpenITI mARkdown** scheme.
1. The tagging of structural elements of the text boils down to the following:
	1. the headers of chapters (`### |`), sections (`### ||`), subsections (`### |||`), etc. The entire text of a header must be on the same line (the entire text will be highlighted, if everything is correct).
	2. and information units: biographies (`### $`), descriptions of events (`### @`), and dictionary entries (also `### $`)
	3. If a structural/logical unit is tagged correctly, the color of the tagged unit will change accordingly.
1. Tagging must be done through the collation of the electronic text of a book with the printed edition on which the electronic text is based. Most editions can be easily found online as PDF files (‘googling’ the title—in the original language—usually brings up a lot of results; PDFs are most likely to be on [Archive.org](https://archive.org/))

# Detailed Description

## File structure

The **OpenITI mARkdown** file includes three main sections: 1) `magic value` that activates the scheme in **EditPad Pro** (`######OpenITI#`); 2) non-machine-readable metadata header (lines starting with `#META# ...`); machine-readable metadata is to be collected in corresponding `*.yml` files; see below for more details); 3) text of the book proper (begins after `#META#Header#End#`). The screenshot below displays the top of a file in **OpenITI mARkdown** with all three elements.

<figure class="fit">
	<a href="{{ site.url }}/images/mARkdown/mARkdown01.png" title="">
	<img src="{{ site.url }}/images/mARkdown/mARkdown01.png">
	</a>
	<figcaption>
		<b>OpenITI mARkdown</b>: three main sections of a document.
	</figcaption>
</figure>

# File-naming conventions in **OpenITI**:

## CTS-compliant naming pattern

*Canonical Text Services*, or *CTS*, offer a powerful mechanism for building expandable and interoperable corpora. The power of the CTS lies in the `URN`, a *uniform resource name* (also `URI`, *unique resource identifier*), which *provide the permanent canonical references to texts or passages of text, and are used by Canonical Text Services (CTS) to identify or retrieve passages of text* (For an overview, see [*CTS Overview*](http://www.homermultitext.org/hmt-doc/cite/texts/ctsoverview.html)).

<figure class="fit">
	<a href="{{ site.url }}/images/mARkdown/mARkdown00a.png" title="">
	<img src="{{ site.url }}/images/mARkdown/mARkdown00a.png">
	</a>
	<figcaption>
		<b>CTS URN Structure</b>.
	</figcaption>
</figure>

To make this example more understandable in the context of **OpenITI**, let’s take a look at a practical example of al-Ḏahabī’s *Taʾrīḫ al-islām*. 

<figure class="fit">
	<a href="{{ site.url }}/images/mARkdown/mARkdown00b.png" title="">
	<img src="{{ site.url }}/images/mARkdown/mARkdown00b.png">
	</a>
	<figcaption>
		<b>CTS URN Structure:</b> al-Ḏahabī’s <i>Taʾrīḫ al-islām</i>.
	</figcaption>
</figure>

**OpenITI** corpus is organized in compliance with CTS guidelines as they are implemented in the *CapiTainS Suite*, developed by Bridget Almas and Thibault Clérice at Tufts University and Leipzig University ([http://capitains.org/](http://capitains.org/)), although the conversion into TEI XML is yet to be implemented. The entire corpus is divided into a series of repositories. Each repository covers a chronological period of 25AH lunar years, including authors who died within a given period. For example, the repository `0525AH` includes authors whose death dates fall in the range of 501–525 AH). Below is an example of how al-Ġazālī’s *Iḥyāʾ ʿulūm al-dīn* fits into the corpus.

<figure class="fit">
	<a href="{{ site.url }}/images/mARkdown/mARkdown00c.png" title="">
	<img src="{{ site.url }}/images/mARkdown/mARkdown00c.png">
	</a>
	<figcaption>
		<b>CTS-Compliant Folder Structure:</b> Versions of al-Ġazālī’s <i>Iḥyāʾ ʿulūm al-dīn</i> incorporated into the repository <i>0525AH</i> within <i>OpenITI</i>.
	</figcaption>
</figure>

From the example below, you can see that the repository `0525AH` includes a subfolder `data`, which includes a subfolder with al-Ġazālī’s URI, `0505Ghazali`, which then includes a subfolder with *Iḥyāʾ ʿulūm al-dīn* URI, `0505Ghazali.IhyaCulumDin`, which then includes ass the relevant files. *NB:* `README.md` files contain some technical descriptions for a relevant level; `*.yml` files contain machine-readable metadata (On these metadata files see below).



## File extensions

* `[no extension]` : This is a RAW file, automatically converted from its initia format to be as close to the **OpenITI mARkdown** format as possible.
* `*.inProgress` :  The file has been selected to be fuly converted into OpenITI mARkdown and is currently `in progress` of being converted (`github` log contains the username of the person who is working on the file).
* `*.completed` : The conversion of the file is completed, but the file still requires final verification and vetting.
* `*.mARkdown` : The file has been verified and vetted. This version should also have expanded tags and IDs assigned to each logical unit.

In the long run we are envisioning the entire corpus to be converted into `TEI XML` and becoming available as a library for researchers through some XML-based library framework.