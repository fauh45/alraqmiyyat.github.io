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
permalink: /mARkdown_new_draft/
---

**OpenITI mARkdown** is not meant to be a comprehensive standard (like TEI XML), but rather a light-weight tagging scheme that render texts machine readable and can be easily adapted to specific research tasks. The scheme consists of a set of unified patterns, but also includes custom patterns that facilitate analysis of specific types of data. These patterns can be divided into structural (unified), morphological (unified, customizable) and semantic (unified customizable, but also custom). It currently accommodates a variety of research inquiries. 

The main goal of **OpenITI mARkdown** is to provide a simple system for tagging structural, morphological and semantic elements in premodern and early modern Islamicate texts of the [OpenITI corpus](https://github.com/OpenITI). The use of **OpenITI mARkdown** will allow one to engage in the computational analysis of texts in the same way as allowed by the more complex and time-consuming tagging schemes such as TEI XML; **OpenITI mARkdown** will also facilitate the conversion of the large volume of Islamicate texts into TEI XML, which is now the standard format for digital editions. In principle, **OpenITI mARkdown** does not require any special editor, but the current implementation relies on EditPad Pro, which supports right-to-left languages, Unicode, and large files. However, it is the support of custom highlighting and navigation schemes that makes this text editor particularly convenient for **OpenITI mARkdown**.

*Note*: The scheme is automatically activated in EditPro by the following `magic value`: `#####OpenITI#` (i.e., the very first line of the text file must consist only of this string). 

*Note-to-self*: use capital letters for abbreviated tags, small—for complete.


# Short Description

1. Download and install [EditPad Pro](http://www.editpadpro.com/); unfortunately, **EditPad Pro** is for Windows only; if you are using Mac or Linux, you can still use it with some virtualization option.
2. Download **OpenITI mARkdown** schemes from GitHub ([https://github.com/maximromanov/mARkdown](https://github.com/maximromanov/mARkdown)), and unzip, and copy all the files into `%APPDATA%\JGsoft\EditPad Pro 7` (*Note*: make sure that EditPad Pro in not running: you need to do `File > Exit` to completely close it).
3. The scheme is automatically activated in EditPad Pro by the first line in the file, which must be: `#####OpenITI#` (called *magic value* in EditPad Pro).
3. Texts in the repositories of the [OpenITI Project](https://github.com/OpenITI) have already been preprocessed. Opening any of these texts in EditPad Pro should automatically activate **OpenITI mARkdown** scheme.
4. The tagging of structural elements of the text boils down to the following:
	1. the headers of chapters (`### | `), sections (`### ||`), subsections (`### ||| `), etc. The entire text of a header must be on the same line (the entire text will be highlighted, if everything is correct).
	2. and information units: biographies (`### $ `), descriptions of events (`### @ `), and dictionary entries (also `### $ `)
	3. If a structural/logical unit is tagged correctly, the color of the tagged unit will change accordingly.
5. Tagging must be done through the collation of the electronic text of a book with the printed edition on which the electronic text is based. Most editions can be easily found online as PDF files (‘googling’ the title—in the original language—usually brings up a lot of results; PDFs are most likely to be on [Archive.org](https://archive.org/)) 

{% include toc icon="gears" title="Table of Contents" %}


# Internal Document: Only Patterns

# 1. Structural Patterns

## 1.1 Structural Divisions

###  1.1.2 Metadata

	*Pattern*: `^#META# .*\n`

### 1.1.3 Editorial sections

	*Pattern*: `^### \|EDITOR\|  .*`

### 1.1.4 Chapter headers (5 Levels Colored)

- rainbow colors

	*Pattern*: `^### \| .*`
	*Pattern*: `^### \|\| .*`
	*Pattern*: `^### \|\|\| .*`
	*Pattern*: `^### \|\|\|\| .*`
	*Pattern*: `^### \|\|\|\|\|+ .*`

### 1.1.5 Analytical units

- short and expanded versions
- biographies (several types)
- descriptions of events (single and blocks)
- other types of entries


# 2 Morphological Patterns

- general morphological pattern
- pattern: `#~category~# @Tag1 @Tag2 @Tag3 ... @TagX`
- the pattern is unified, but categories can be customized (make sure to keep track of your categories)
- Example of categories for biographies: `onomastic`, `birth`, `teachers`, `travels`, `students`, `books`, `misc`, `death`, `reaction_of_community`, etc. 
- use `RAW` to markdown morphological elements that are not yet defined.

# Semantic Patterns

- as is...

## Universal pattern

## Custom patterns


# Annotation patterns

- ignore line: `^~!~` to isolate a `misplaced` element that should be excluded during text mining;
- comment: `#comment#` free running comment/note which will be excluded from text-mining analysis
- entities: `#entities#~category~# ` followed by the list of comma-separated entities; `category` links entities to a relevant morphological element (Use case: a potentially valuable description of a biographee—trade, occupation—is mentioned outside of the onomastic section; *example*: `#entities#~onomastic~# trade1, occupation1`)


## 1.2 Structural Elements (In-text elements)

- paragraphs
- volume and page numbers
- poetic verses (simplify: only the divider between hemistichs; or in the beginning, if not a traditional meter)


# NEW VERSION

# Detailed Description

# 1. Structural Patterns

## 1.1 Structural Divisions

###  1.1.1 Magic value

The *magic value*—`######OpenITI#`—is the first line of the text file that activates the highlighting scheme in `EditPad Pro`. *Note*: If you are adding the magic value, reopen your file to activate the scheme.

*RE Pattern:* `^######OpenITI#\n`

*Example:* `######OpenITI#`

*Image*: ...

###  1.1.2 Metadata

Included after the magic value and before the beginning of the actual text, these lines preserve metadata on the text salvaged from the source of the text. This data is not machine-readable, but helpful for understanding the origins of the digital text.

*RE Pattern*: `^#META# .*\n`

*Example*: `#META# الناشر: دار الغرب الإسلامي`

*Image*: ...

### 1.1.3 Editorial sections

Many books also include sections written by editors. These sections are not parts of the actual source and they must be tagged distinctively so that they could be easily excluded from automated forms of analysis. The tag can also be used for any “in-edition” information, which is not relevant to the actual text of the source (for example, there are often lines saying this is such and such volume of a such and such book—these can be tagged as “editorial headers”). The tag is added in the same manner as chapter headers.

*RE Pattern*: `^### \|EDITOR\|  `

*Example*: `^### |EDITOR| مقدمة المحقق`

*Image*: ...

*NB*: previous patterns — `^### ===  .*\n`


### 1.1.4 Chapter headers

Headers are for the titles of main structural units, like chapters, subchapters, etc. in the text of the source. The entire header must be on one line—only in this case it will be fully highlighted—and must include three main elements:

1. `###` — three hashtags at the beginning of the line;
2. `|` — pipes, whose number corresponds to the level of a header;
3. `header` — the text of a header (followed by `\n`, “new line” character)



*RE Pattern*: `^### \|+ .*`

*Example*: 

```
### | First Level Header (red)

### || Second Level Header (orange)

### ||| Third Level Header (yellow)

### |||| Fourth Level Header (green)

### ||||| Fifth Level Header (blue)
```

*Image*: ...

<figure class="fit">
	<a href="{{ site.url }}/images/md/mARkdown01.gif" title="">
	<img src="{{ site.url }}/images/md/mARkdown01.gif">
	</a>
	<figcaption>
		<b>Tagging headers of different level</b>: Headers get highlighted with different colors when tagged properly. Colors follow the rainbow spectre; they stop changing after Level V.
	</figcaption>
</figure>


### 1.1.5 Analytical units

 - biographies, descriptions of events, other types of entries

## 1.2 Structural Elements

- paragraphs
- volume and page numbers
- poetic verses (simplify: only the divider)


# 2 Morphological Patterns

- general morphological pattern
- pattern: `#~category~# @Tag1 @Tag2 @Tag3 ... @TagX`
- the pattern is unified, but categories can be customized (make sure to keep track of your categories)
- Example of categories for biographies: `onomastic`, `birth`, `teachers`, `travels`, `students`, `books`, `misc`, `death`, `reaction_of_community`, etc. 
- use `RAW` to markdown morphological elements that are not yet defined.

# Semantic Patterns

- as is...

## Universal pattern

## Custom patterns


# Annotation patterns

- ignore line: `^~!~` to isolate a `misplaced` element that should be excluded during text mining;
- comment: `#comment#` free running comment/note which will be excluded from text-mining analysis
- entities: `#entities#~category~# ` followed by the list of comma-separated entities; `category` links entities to a relevant morphological element (Use case: a potentially valuable description of a biographee—trade, occupation—is mentioned outside of the onomastic section; *example*: `#entities#~onomastic~# trade1, occupation1`)


# OLD VERSION




## I.3. Information Units

**RE**: *_multiple_*

Most of the texts that I have worked with so far have a very clear structure (chapters > subchapters > subsubchapters, etc.), where the lowest level structural units (subchapters or subsubchapters) are made of “information units,” such as biographies in biographical collections, descriptions of events in chronicles, and dictionary entries (on lexical items, names, toponyms, book titles, etc.)

Using **OpenITI mARkdown**, one needs only to mark the beginning of each information unit. Each unit can be marked with either a simplified or full tag. Simplified tags are short, which makes them ideal for manual tagging. Simplified tags are, however, ambiguous. Full tags are more readable and source independent. Full tags are particularly important when information from multiple sources is processed at the same time.

**OpenITI mARkdown** has been first developed for biographical collections, chronicles, bibliographical collections, and dictionaries of different types. In most cases, these sources contain one type of information units and in such cases one can use only one type of tag `### $ [information unit]`, which can be later converted—using find/replace—into corresponding full tags. Below is the description of used tags.

### I.3.1 Dictionaries

**RE**: *_multiple_*

Arabic dictionaries usually include information units of the same types, so one simplified tag—`### $ [a dictionary item]`—is sufficient. The full tags depend on the nature of each dictionary and at the moment include “descriptive names,” toponyms, lexical items, and book titles. Tags for them are as follows:

~~~
### $DIC_NIS$ [a descriptive name entry]

### $DIC_TOP$ [a toponym entry]

### $DIC_LEX$ [a lexical entry]

### $DIC_BIB$ [a book title]
~~~


### I.3.2 Biographical Collections and Chronicles

**RE**: *_multiple_*

Biographical collections often include several types of information units. Moreover, there are plenty of sources that combine features of both biographical collections and chronicles (“obituary chronicles”), so one often has to deal with a variety of information units in the same text. For this reason, the main simplified tags are as follows:

~~~
### $ [a biography of a man]

### $$ [a biography of a woman]

### $$$ [a cross-reference and/or repetition, for both men and women]

### $$$$ [a list of names]

### @ [a historical event]

### @ RAW [a batch of historical events]

~~~

<figure class="fit">
	<a href="{{ site.url }}/images/md/mARkdown_bio1.gif" title="">
	<img src="{{ site.url }}/images/md/mARkdown_bio1.gif">
	</a>
	<figcaption>
		<b>OpenITI mARkdown</b>: Tagging biographical units with simplified tags
	</figcaption>
</figure>

**NB**: `### @ RAW` can be used to tag blocks of historical events when it is not immediately clear when one information unit ends and another begins. With these tags in place, one can return to an unfinished batch later, read it more carefully, and split properly into single units. There is also, of course, a conceptual and methodological issue with regard to what constitutes an ‘event’. For the purposes of algorithmic analysis, [the “description of an] event” is a structurally and thematically complete unit of text that describes an entity that has 5 properties: subject, predicate, object, time and place. In other words, it is something that can be grouped into categories, graphed across time, and mapped in space.

Full tags are as follows:

~~~
### $BIO_MAN$ [a biography of a man]

### $BIO_WOM$ [a biography of a woman]

### $BIO_REF$ [a cross-reference, for both men and women]

### $BIO_NLI$ [a list of names]

### $CHR_EVE$ [a historical event]

### $CHR_RAW$ [a batch of historical events]

~~~

<figure class="fit">
	<a href="{{ site.url }}/images/md/mARkdown_bio2.gif" title="">
	<img src="{{ site.url }}/images/md/mARkdown_bio2.gif">
	</a>
	<figcaption>
		<b>OpenITI mARkdown</b>: Tagging biographical units with full tags. You can see here how first the unit is not highlighted because of a typo. You can also see one of the common problems that come from combining RTL and LTR text—visually the tags look like they were not typed properly (<b>BIO_MAN$</b>, instead <b>$BIO_MAN$</b>). 
	</figcaption>
</figure>

### I.3.3 Other types of information units

### I.3.3.1 *Riwāyāt* units

**NB**: U Frankfurt Team; *added*: August 12, 2016; *updated*: March 31, 2017

Each *riwāyaŧ*/*ḥadīṯ* report should be treated as a separate paragraph: `new line + # $RWY$ `; in order to mark the boundary between *isnād* and *matn*, `@MATN@` tag is to be inserted between *isnād* and *matn*. Since it is not uncommon to have an evaluation of reported material, tag `@HUKM@` can be used to tag the beginning of the *ḥukm*-statement. All three elements of a *riwāyaŧ/ḥadīṯ* must remain the part of the same `paragraph`.

```
# $RWY$ this section contains isnād @MATN@ this section
contains matn @HUKM@ this section contains ḥukm .
``` 

It is not uncommon that either *isnād* or *matn* is missing. In such cases `@MATN@` tag still must be inserted: in the case of missing *isnād*, `@MATN@` directly follows `# $RWY$ `; in the case of missing *matn*, `@MATN@` becomes the last element in the *ḥadīṯ* paragraph. `@HUKM@` is optional and inserted only when there is a *ḥukm*-statement.

<figure class="fit">
	<a href="{{ site.url }}/images/md/riwayat_tagging.png" title="">
	<img src="{{ site.url }}/images/md/riwayat_tagging.png">
	</a>
	<figcaption>
		<b>OpenITI mARkdown</b>: An example of tagging <i>riwāyāt</i> in Ibn al-Jawzī’s <i>Talbīs Iblīs</i>.
	</figcaption>
</figure>

The following regular expression will help highlighting sections with *isnād*s (copy-paste it into the search window of **EditPad Pro**):

```
\bو?(عن|حدث(نا|ني|ت)|[اأ]نبأ(نا|ني|ت)|[اأ]خبر(نا|ني|ت)|ث?نا|ثني)(( |\n~~)(\w+( |\n~~)){2})
```

#### I.3.3.2 Doxographical units

**NB:** David Bennet; added: September 23, 2016

The following tags are section tags to be places at the beginning of a relevant section: (1) `### $DOX_POS$` for sections dealing with doxographical/theological positions; (2) `### $DOX_SEC$` for descriptions of religious groups (“sects”). These can be used equally in doxographical texts and texts that address doxographical issues among many other things. 

### I.3.4 Secondary divisions in chapters and information units

#### I.3.4.1 Internal subdivisions

Chapters and information units may have internal divisions that are marked either in the original editions or being introduced by a researcher. These can be tagged with `# --- description` either on a separate line right before a sub-unit (where `description` is a researchers own characterization of a unit, i.e. `# --- teachers` marks a section of a biography that includes the names of a biographee’s teachers)  


# II. In-text elements
<hr>

Most of the in-text elements are already in pre-formatted texts. In most cases, you do not need to worry about them, but it is important to understand how they function.

## II.1 Paragraphs and lines

**RE**: `^# `, `^~~`

In premodern Arabic texts paragraphs as units are not particularly reliable. Yet, if a certain electronic text reproduces a printed edition, it is worth preserving its division into paragraphs. Each paragraph begins with a hashtag, `#`.

While EditPad Pro handles large files very well, it has problems with long paragraphs (or, more correctly, lines). For this reason, long paragraphs are split into shorter lines, where each line starts with `~~` (two tildas).

<figure class="fit">
	<a href="{{ site.url }}/images/md/mARkdown_par.gif" title="">
	<img src="{{ site.url }}/images/md/mARkdown_par.gif">
	</a>
	<figcaption>
		<b>OpenITI mARkdown</b>: Dealing with paragraphs
	</figcaption>
</figure>

## II.2 Poetry

**RE**: `%~%`

Poetry lines can be tagged in the following manner: one line of poetry per line/paragraph, beginning and ending with `%~%` and with hemistichs divided by `%~%` (when applicable).

```
# %~% hemistich1 %~% hemistich2 %~%
```

_an image to be added_

## II.3 Qur’anic verses

**RE:** `@QB@ .*? @QE@`

Qur’anic verses can be tagged in the following manner: 1) `@QB@`—at the beginning of a verse; 2) `@QE@`—at the end.

**NB**: it is not recommended to tag verses of the Qurʾān at this point; the tags that may occur in the existing texts simply preserve residual and inconsistent tagging of Qurʾānic verses in the initial versions of texts.

## II.4 Page numbers

**RE**: `PageV\d\dP\d\d\d`

Most of electronic texts preserve page numbers. **OpenITI mARkdown** supports the following format `PageV##P###`, where `V##` is the volume number, and `P###` is the page number. Volume number must be two digits, page number—three (padded with zeros when necessary). Thus, `PageV05P022` stands for Vol. 5, p.22. Page number tags are inserted at the end of the corresponding page.

## II.5 Footnotes & Endnotes

**RE**: `NoteV\d\dP\d\d\dN\d\d`

In a very similar manner notes—both footnotes and endnotes—can be tagged: `NoteV##P###N##`, where `V##` is the volume number, and `P###` is the page number, and `N##` is the note number. The content of notes is put into the end of the text, as endnotes. 

_to be updated_

## II.6 Miscellanea

**RE**: *non-Arabic letters, numbers, punctuation*

All non-letter characters are automatically highlighted as elements that may have some value for the structural understanding of a text. These include: punctuation, numbers, non-Arabic letters.


# III. Analytical Patterns and Semantic Tagging

**OpenITI mARkdown** also includes a series of patterns/tags to highlight results generated with/for algorithmic analysis. Unlike previous elements, these additions to the text that are either generated automatically, or inserted manually.  

## III.1 Geographical Information

Geographical texts—such as comprehensive geographies—contain a lot of data that can be used for modeling historical processes in space. Of particular importance are administrative divisions and trade routes, which often come with distances.

### III.1.1 Administrative Divisions

**RE:** `#\$#(PROV|REG\d)# .*? #\$#TYPE .*? #\$#(REG\d|STTL) ([\w# ]+) $`

Most descriptions fit into the following scheme `WORLD: PROVINCE > TYPE > (REGION) > TYPE > SETTLEMENT`. In the actual text, relevant information is tagged essentially as ‘triples’ of `SUBJECT > PREDICATE > OBJECT` (with multiple OBJECTs that will be parsed out at a later stage):

~~~
#$#PROV toponym #$#TYPE type_of_region #$#REG1 (toponym #)+

#$#REGX toponym #$#TYPE type_of_region #$#REGX (toponym #)+
 
#$#REGX toponym #$#TYPE type_of_settlement #$#STTL (toponym #)+ 
~~~

**Note**: _Clip collection_ can be used to insert relevant patterns into the text.

<figure class="fit">
	<a href="{{ site.url }}/images/md/analytical_divisions.png" title="">
	<img src="{{ site.url }}/images/md/analytical_divisions.png">
	</a>
	<figcaption>
		<b>OpenITI mARkdown</b> pattern for describing administrative divisions; using Clip Collection (on the left) one can insert a relevant pattern into the text and fill it in 
	</figcaption>
</figure>

### III.1.2 Routes and distances

**RE:** `#$#FROM .*? #$#TOWA .*? #$#DIST .*`

Route sections with distances are tagged in the following manner:

~~~
#$#FROM toponym #$#TOWA toponym #$#DIST distance_as_recorded
~~~

<figure class="fit">
	<a href="{{ site.url }}/images/md/analytical_distances.png" title="">
	<img src="{{ site.url }}/images/md/analytical_distances.png">
	</a>
	<figcaption>
		<b>OpenITI mARkdown</b> pattern for describing routes and distances
	</figcaption>
</figure>

## III.2 Named Entities

**NB:** Added: April 22, 2016

At the moment these include toponyms (`@TOPXX` and `@TXX`), individuals (`@PERXX` and `@PXX`) and social/onomastic/biographical characteristics (`@SOCXX` and `@SXX`).

All tags have similar structure `@` + `CODE` + two numbers. `CODE`s have two variations: 1) long (three letters) and 2) short (one letter). Triliteral `CODE`s are used for automatic tagging with scripts and entity lists; one-letter short `CODE`s are used for manual tagging and disambiguation of automatic tags.

`XX`, two numbers, indicate:

1. the length of an attached prefix. For example, if `wa-` or `bi-` are attached to an entity, the first number must be `1`, which means that 1 character from the beginning must be removed)
2. the length of the entity. If the entity is a bigram (*Madīnaŧ al-Salām*), number `2` must be used (both words will be automatically highlighted).

**NB**: The tags have two varieties: a long one and a short one. The long one will be used for automatic tagging (*the automatic tagger is in progress*), while the short one will be reserved for manual tagging, as shorter tags are easier to type in manually; additionally, the conversion of an automatic tag into a manual one in the process of edition and disambiguating is more efficient by deleting two characters, rather than adding them. 

### III.2.1 Toponyms

1. Automatic long tag: `@TOPXX`
2. Manual short tag: `@TXX`

<figure class="fit">
	<a href="{{ site.url }}/images/md/md_top_tag.gif" title="">
	<img src="{{ site.url }}/images/md/md_top_tag.gif">
	</a>
	<figcaption>
		<b>OpenITI mARkdown</b> pattern for tagging toponyms
	</figcaption>
</figure>

### III.2.2 Individuals (Persons)

1. Automatic long tag: `@PERXX`
2. Manual short tag: `@PXX`

### III.2.3 Biographical characteristics

1. Automatic long tag: `@SOCXX`
2. Manual short tag: `@SXX`

### III.3 Years AH

Years AH can be tagged in the following manner (where `#` is a digit; there must be spaces on both sides of the year tag):

2. `YB####` — a year of birth, as mentioned in a biography; for example, `@YB510` means that a biographee was born in the year 510 of the Islamic *hijrī* calendar.
2. `YD####`—a year of death, as mentioned in a biography; for example, `@YD597` means that a biographee died in the year 597 of the Islamic *hijrī* calendar.
3. `YY####`—any other type of year references mentioned in a text.
4. `YA####` — age in years.

### III.4 Open Semantic Tagging Pattern

This pattern is easily adjustable for tagging specific semantic patterns. The overall pattern is `@USER@CAT_SUBCAT_SUBSUBCAT@`, where `USER` is an alias of a researcher introducing a pattern (three-letter initials is an option—`MGR` in my case); `CAT_SUBCAT...` represents categorical branching, where categories are defined by a researcher for specific purposes.

```
MGR
├── WACZ
│   ├── education
│   │   ├── quran
│   │   ├── hadith
│   │   └── fiqh
│   └── sermons
│       ├── hell
│       ├── paradise
│       └── love
├── KHUTBA
│   ├── education
│   │   ├── punishment
│   │   ├── hadith
│   │   └── fiqh
│   └── sermons
│       ├── hell
│       ├── paradise
│       └── love
└ etc.
```

Above is a snapshot of a scheme that I used for tagging biographies of preachers. In this example, I am looking into individuals involved into two different forms of preaching—*waʿẓ* and *ḫuṭbaŧ*, their education backgrounds and topics of their sermons. Thus, my tag in the case of a *wāʿiẓ* who had training in *fiqh* will look as follows: `@MGR@WACZ_education_fiqh@`. In combination with chronological, geographical and social information (derived from *nisbaŧ*s), one can get a perspective on how many individuals involved in *waʿẓ* had training in *fiqh* and if there are any chronological, geographical and social peculiarities to this information.

It is vital to keep track of tags one introduces and avoid creating too many of them. Another useful strategy is to keep them short, for instance: `@MGR@WCZ_ed_fqh@` (it is your own decision, of course, how to balance brevity and readability).

# IV. Known issues with EditPad Pro and OpenITI mARkdown

## IV.1. Highlighting scheme running amok

Occasionally it happens that highlighting scheme loses its track and gets shifted, highlighting wrong elements. One of the things that may trigger this behavior is a long regular expression in a search field, but sometimes it happens for some other reasons. This can be fixed through refreshing the highlighting scheme by going through the following steps: `[Options >] Configure File Types... > Color Syntax > Refresh` (`Ok`).

## IV.2. Folding scheme does not seem to work

Folding lines is a very convenient tool, but it seems to take a while before for it to load when one opens **EditPad Pro**. This can be fixed by going through the following steps: `[Options >] Configure File Types... > Navigation > Refresh` (`Ok`).
