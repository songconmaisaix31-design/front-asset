# cosmos.gl static source map

Pinned upstream: [`cosmosgl/graph@ce35edacf94dba1f02ef2b47957e937e4c9acf17`](https://github.com/cosmosgl/graph/tree/ce35edacf94dba1f02ef2b47957e937e4c9acf17), package `@cosmos.gl/graph` 3.4.1. The repository commit and `LICENCE` were verified over GitHub HTTP; no build, install, or execution was performed.

## Entry and data contract

- `src/index.ts` [`Graph`](https://github.com/cosmosgl/graph/blob/ce35edacf94dba1f02ef2b47957e937e4c9acf17/src/index.ts#L32-L100) owns the WebGL graph. `new Graph(container, config)` is the core instantiation boundary.
- Point positions are `Float32Array` `[x0,y0,...]`; links are `Float32Array` endpoint pairs `[source0,target0,...]` (`setPointPositions`, `setLinks`). Colors are RGBA float arrays; point/link sizes and widths are parallel arrays.
- `src/config.ts` [`GraphConfigInterface`](https://github.com/cosmosgl/graph/blob/ce35edacf94dba1f02ef2b47957e937e4c9acf17/src/config.ts#L9-L20) documents visual parameters: background, point/link defaults, opacity, curved links, arrows, zoom scaling, simulation forces, and fit-view.

## Interaction and lifecycle

- D3 zoom/drag are bound by `index.ts` during initialization; `zoom`, `fitView`, `zoomToPointByIndex`, and coordinate conversion methods are public API. `enableZoom`/`enableDrag` configure interaction.
- Click callbacks (`onClick`, `onPointClick`, `onLinkClick`, `onBackgroundClick`) and hover callbacks are declared in `config.ts` around [L492-L654](https://github.com/cosmosgl/graph/blob/ce35edacf94dba1f02ef2b47957e937e4c9acf17/src/config.ts#L492-L654).
- Highlighting is config-driven via `highlightedPointIndices`, `highlightedLinkIndices`, and `outlinedPointIndices`; picking is screen-space ID buffers, documented in [`docs/picking/README.md`](https://github.com/cosmosgl/graph/blob/ce35edacf94dba1f02ef2b47957e937e4c9acf17/docs/picking/README.md).
- `destroy()` removes namespaced canvas/document listeners, destroys graph modules/device, and clears owned resources ([anchor](https://github.com/cosmosgl/graph/blob/ce35edacf94dba1f02ef2b47957e937e4c9acf17/src/index.ts#L1545-L1612)).

## Example boundary and gaps

`src/stories/showcase/full-mesh.ts` is demo-only: it calls missing sibling helpers `../create-cosmos` and `../generate-mesh-data`; R2-SRC adds the minimally required licensed helper sources, which depend on `d3-scale`, `d3-scale-chromatic`, and the package itself. `create-cosmos.ts` supplies demo defaults and calls `graph.zoom(0.9)`/`render()`; `generate-mesh-data.ts` creates a randomized clustered mesh. These are not core API and are not deterministic product data.

Labels/overlays are not a core graph rendering API in the reviewed entry/config subset; sampled-link methods can support a future overlay. No product integration, CSS/DOM runtime, shader implementation, or dependency license audit is claimed. Reuse clearance applies only to the individually copied upstream source files under MIT `LICENCE`, not generated demo data or products/images.
