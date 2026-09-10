# REF-02 cosmos.gl handoff

Pinned source `ce35edacf94dba1f02ef2b47957e937e4c9acf17` was audited without modifying `reusable/cosmos-gl/`. Existing files and SHA256: `LICENCE` (MIT, `21908E420BC31A24562BED00436E2C9D684403E5326E19617F891A6BF76429DE`), `README.md` (`A6B61E660FABD9DF306499A2D49CE7DB1B5EA136621AFD1C4E954F0492C23773`), `package.json` (`E53A11544501DDA67094BCDFF04C19D4CAD4700BEFD2C890732A39A0101BA670`), `tsconfig.json` (`B7DCEC75C606038FD3FEABF24D374C5FF61D990B13DCC463856042B1FCB3EFB6`), `vite.config.ts` (`1005D59A4F9FF2ECC164A96F4CB1D8681770DC84FABCF80C15F79F3749A8889D`), `docs/picking/README.md` (`B29E48D314293F946EBD7C3F63DEE1508234D08DFEB1A7AFB5C92D648E210570`), `src/config.ts` (`9E255EC37C9719F6BB149C3863E11DB7159C17C75B15B44FDC15454F37D2A75D`), `src/index.ts` (`3DDFC8AA2C71B68E273B90BEB54B5B46736089AE20EBAEA7C303F5C541B70364`), and `src/stories/showcase/full-mesh.ts` (`75FC1E6EE2840740FF72A5F77D3D45BED38F69C39E32DA6C49CC6B8774CEA09F`).

The entry is `src/index.ts`; it imports internal graph modules that are absent from this retained partial snapshot (`@/graph/config`, `helper`, `modules/*`, and `variables`), so it is not self-contained. `vite.config.ts` also expects Vite and vite-plugin-dts. `package.json` lists runtime dependencies including d3, luma.gl, dompurify, gl-bench, gl-matrix, and random, plus development tooling. No NOTICE exists. MIT is recorded, but dependency and transitive notice clearance is missing; keep this index as `reuse-candidate`, not reuse-cleared.

## HANDOFF

Static audit only: do not install dependencies, run scripts, or alter reusable files. A future reuse decision must supply complete source scope and dependency-license/NOTICE review.
