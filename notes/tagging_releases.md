## Notes on Tagging Releases

#### Two Types of Git Tags

There are two types of tags in Git: annotated and lightweight. Both of them will allow you to refer to a specific commit in a repository, but they differ in the amount of metadata they can store.

##### Annotated Tags

> Annotated tags store extra metadata such as author name, release notes, tag-message, and date as full objects in the Git database. All this data is important for a public release of your project.

```
$ git tag -a v1.0.0
```

> In case you wanted to add a tag-message you can pass the -m option, this is a method similar to git commit -m.

```
$ git tag -a v1.0.0 -m "Releasing version v1.0.0"
```

##### Lightweight Tags

> Lightweight tags are essentially "bookmarks" to a commit, they are just a name and a pointer to a commit, useful for creating quick links to relevant commits.

```
$ git tag v1.0.0
```

##### Pushing Tag to Origin

```
$ git push <location> <tag_identifier>
```

Example

```
$ git push origin 01
```

### Our Tagging / Release Process

0. Development notes and thoughts kept in the, "/notes" folder. Documentation images kept in "img."
1. Finish up a version of code and release under normal commit habits, without tagging. Project code kept in a .js file, "main.js," with instructions on how to copy/paste this code into the online IDE.
2. Commit messages for Pre-Release will specifically mention that a particular commit is pre-release, testing status if passing or failing (manual testing).
3. After Pre-Release, make slight modification to Readme file, then annotated tag as release with versioning.
4. Push tag to origin. "Publishing tags - git push <location> <tag_identifier>"
4. Add release dictionary version update to Readme file under, "Markdown.md#versioning" for easy reference.

* Naming convention for the release versions will use two decimal places, 01, 02, ... 0N., etc with decimal numbering.

Example:

```
$ git tag -a 01 -m "Tested version release. Works on X but not Y"

$ git push origin master
```


#### References

The above was more or less taken from the following tutorial:

* [1](https://dev.to/neshaz/a-tutorial-for-tagging-releases-in-git-147e) Tutorial for Tagging Releases in Git
