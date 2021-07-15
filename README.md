# hotweb3
JavaScript/TypeScript client for a remote [Hotmoka](https://www.hotmoka.io) node


## Usage

```html
// In Browser
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
<script src="dist/hotweb3.js"></script>

<script type="application/javascript">
    const remoteNode = new hotweb3.RemoteNode("http://panarea.hotmoka.io");
    (async function() {
        try {
            const takamakacode = await remoteNode.getTakamakaCode();
            alert('takamakacode: ' + JSON.stringify(takamakacode));
        } catch (e) {
            console.error(e);
            alert(e);
        }
    })();
</script>
```

```js
// In Node.js/JavaScript
const { RemoteNode } = require("hotweb3");

const remoteNode = new RemoteNode("http://panarea.hotmoka.io")
(async function () {
    try {
        const takamakaCode = await remoteNode.getTakamakaCode()
        console.log('takamakaCode', takamakaCode)
    } catch (e) {
        console.error(e)
    }
})()
```

```typescript
// In TypeScript
import {
    RemoteNode,
    TransactionReferenceModel
} from "hotweb3";

const remoteNode = new RemoteNode("http://panarea.hotmoka.io")
(async (): Promise<void> => {
    try {
        const takamakaCode: TransactionReferenceModel = await remoteNode.getTakamakaCode()
        console.log('takamakaCode', takamakaCode)
    } catch (e) {
        console.error(e)
    }
})()
```


## Build 

### Requirements

-   [Node.js](https://nodejs.org)
-   [npm](https://www.npmjs.com/)

### Install dependencies
```bash
npm install
```
### Bundle source code

```bash
npm run bundle
```

## Tests
```bash
npm run test:all
```