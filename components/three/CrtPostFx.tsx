"use client";

import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

const CHROMA_OFFSET = new Vector2(0.0008, 0.0008);

/**
 * Real WebGL post-processing for the hero monitor — complements the CSS
 * CrtOverlay (which only touches the DOM, not the canvas): Bloom gives the
 * screen an actual glow instead of a flat emissive color, a faint
 * chromatic aberration sells the CRT lens distortion, and a vignette
 * grounds the scene. Tied to the same CRT toggle as the DOM overlay, so
 * turning it off disables both at once.
 */
export default function CrtPostFx() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.6} luminanceThreshold={0.25} luminanceSmoothing={0.4} mipmapBlur />
      <ChromaticAberration offset={CHROMA_OFFSET} blendFunction={BlendFunction.NORMAL} radialModulation={false} modulationOffset={0} />
      <Vignette eskil={false} offset={0.15} darkness={0.6} />
    </EffectComposer>
  );
}
