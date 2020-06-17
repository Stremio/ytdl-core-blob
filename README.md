# ytdl-core-blob

## Why?

Because `ytdl-core` and many of it's dependencies have an irrational engine requirement of Node.js >=10, and we're using Node 8.x

This engine dependency errors out when using `yarn install`

## How to

Bump `ytdl-core` if needed in `package.json`: https://github.com/Stremio/ytdl-core-blob/blob/master/package.json#L12

Then:
```
npm i
npm start
```

This will webpack `ytdl-core` to `./index.js` which is then used as the entry point for this module, removing the Node.js >=10 requirement.

Finally, use `ytdl-core-blob` from this repository instead of `ytdl-core` itself.
