import os
import google.generativeai as genai
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

class GeminiClient:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")
        if not self.api_key:
            raise ValueError("GOOGLE_API_KEY environment variable is not set")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    async def generate_ascii_prompt(self, text: str, style: str, width: int, height: int, charset: str, density: float) -> str:
        style_prompts = {
            "classic": "traditional ASCII art style using basic characters",
            "modern": "contemporary ASCII art with varied characters and modern aesthetics",
            "minimal": "simple, clean ASCII art with minimal characters",
            "artistic": "creative and artistic ASCII art interpretation"
        }
        
        charset_info = {
            "standard": "standard ASCII characters (spaces, dots, dashes, letters, numbers)",
            "extended": "extended ASCII character set including special symbols",
            "minimal": "minimal character set (spaces, dots, dashes only)",
            "custom": "custom character selection for optimal visual impact"
        }
        
        prompt = f"""
Create ASCII art based on the following description: "{text}"

Requirements:
- Style: {style_prompts.get(style, style_prompts['classic'])}
- Dimensions: {width} characters wide by {height} lines tall
- Character set: {charset_info.get(charset, charset_info['standard'])}
- Detail level: {density} (where 1.0 is normal detail)
- The output should be pure ASCII art only, no explanations or additional text
- Make it visually appealing and representative of the described text
- Use appropriate spacing and character density for the specified style

Generate the ASCII art now:
"""
        return prompt
    
    async def generate_content(self, prompt: str) -> str:
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Failed to generate content from Gemini: {str(e)}")
    
    async def refine_ascii(self, original_text: str, modification: str, current_ascii: str) -> str:
        prompt = f"""
Modify the following ASCII art based on the instruction provided.

Original description: "{original_text}"
Modification request: "{modification}"

Current ASCII art:
{current_ascii}

Please provide the modified ASCII art that incorporates the requested changes while maintaining the overall structure and readability. Return only the ASCII art, no explanations.
"""
        return await self.generate_content(prompt)