import time
from typing import Optional
from .gemini_client import GeminiClient

class ASCIIGenerator:
    def __init__(self):
        self.gemini_client = GeminiClient()
    
    async def generate(
        self,
        text: str,
        style: str = "classic",
        width: int = 80,
        height: int = 40,
        charset: str = "standard",
        density: float = 1.0
    ) -> str:
        start_time = time.time()
        
        try:
            prompt = await self.gemini_client.generate_ascii_prompt(
                text=text,
                style=style,
                width=width,
                height=height,
                charset=charset,
                density=density
            )
            
            ascii_art = await self.gemini_client.generate_content(prompt)
            
            ascii_art = self._clean_ascii_output(ascii_art)
            ascii_art = self._ensure_dimensions(ascii_art, width, height)
            
            generation_time = time.time() - start_time
            print(f"ASCII generation completed in {generation_time:.2f} seconds")
            
            return ascii_art
            
        except Exception as e:
            raise Exception(f"Failed to generate ASCII art: {str(e)}")
    
    async def refine(self, original_text: str, modification: str, current_ascii: str) -> str:
        try:
            return await self.gemini_client.refine_ascii(original_text, modification, current_ascii)
        except Exception as e:
            raise Exception(f"Failed to refine ASCII art: {str(e)}")
    
    def _clean_ascii_output(self, ascii_art: str) -> str:
        lines = ascii_art.split('\n')
        
        cleaned_lines = []
        for line in lines:
            if line.strip():
                cleaned_lines.append(line.rstrip())
        
        return '\n'.join(cleaned_lines)
    
    def _ensure_dimensions(self, ascii_art: str, target_width: int, target_height: int) -> str:
        lines = ascii_art.split('\n')
        
        adjusted_lines = []
        for line in lines[:target_height]:
            if len(line) > target_width:
                adjusted_lines.append(line[:target_width])
            else:
                adjusted_lines.append(line.ljust(target_width))
        
        while len(adjusted_lines) < target_height:
            adjusted_lines.append(' ' * target_width)
        
        return '\n'.join(adjusted_lines)