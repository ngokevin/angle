# angle

[angle](https://aframe.io) is a general purpose command-line tool for A-Frame.
angle can install components from the Registry into an HTML file, initialize
component templates for publishing, and bootstrap scene boilerplate.

<img src="https://cloud.githubusercontent.com/assets/674727/19332873/0ea826e6-90a5-11e6-9c4f-9dff33bb9fcb.png" width="320">

### Installation

```
npm install -g angle
angle <command>
```

### Commands

Run `angle --help` to get a list of all commands and options.

#### `angle initlocalcomponent <componentName>`

Quickly create a component JavaScript file from a simple template
locally in the working directory. Meant to be used to
create a component for an application. Not meant
for publishing or sharing.

```
angle initlocalcomponent enemy-ship
```

#### `angle initcomponent`

[component]: https://aframe.io/docs/master/introduction/writing-a-component.html

Create a template in the working directory for an A-Frame component for
publishing to the ecosystem. This command will ask several questions about your
component to get things set up. See [how to write a component][component].

```
angle initcomponent
```

To develop the component:

```
npm install
npm run dev
```

To publish the component to the ecosystem:

```
npm publish
npm run ghpages
```

Then submit to the [A-Frame Registry](https://github.com/aframevr/aframe-registry).

#### `angle initscene`

Bootstrap an A-Frame scene in the working directory. This command will
currently ask for the name of the scene and whether or not you want tracked
controllers.

```
angle initscene

? What is your scene's title? (e.g., Forest Scene)
? Do you want tracked controls with hand models? (y/N)
```
