# angle

[A-Frame](https://aframe.io) is a web framework for creating virtual reality
experiences. Angle is an A-Frame command-line tool for installing components
and scaffolding templates.

<img src="https://cloud.githubusercontent.com/assets/674727/19332873/0ea826e6-90a5-11e6-9c4f-9dff33bb9fcb.png" width="320">

### Installation

```
npm install -g aframe-angle
angle <command>
```

### Commands

Run `angle --help` to get a list of all commands and options.

#### `angle install <componentname> [htmlfilename]`

Install a component from the registry to an HTML file. This will detect the
A-Frame version from your HTML file and install the appropriate version of the
component as a `<script>` tag.

```
angle install aframe-physics-system myaframescene-1.html
```

#### `angle initcomponent`

Create a template in the working directory for publishing an A-Frame component.
Formerly [A-Frame Component
Boilerplate](https://github.com/ngokevin/aframe-component-boilerplate).

```
angle initcomponent
```
