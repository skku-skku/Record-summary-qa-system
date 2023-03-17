import torch
from transformers import PreTrainedTokenizerFast
from transformers import BartForConditionalGeneration


class LoadModel(object):
    def __init__(self, text) -> None:
        self.tokenizer = PreTrainedTokenizerFast.from_pretrained('digit82/kobart-summarization')
        self.model = BartForConditionalGeneration.from_pretrained('digit82/kobart-summarization')
        self.text = text

    def solution(self):
        text = self.text.replace('\n', ' ')

        raw_input_ids = self.tokenizer.encode(text)
        input_ids = [self.tokenizer.bos_token_id] + raw_input_ids + [self.tokenizer.eos_token_id]

        summary_ids = self.model.generate(torch.tensor([input_ids]),  num_beams=4,  max_length=2048,  eos_token_id=1)
        summary = self.tokenizer.decode(summary_ids.squeeze().tolist(), skip_special_tokens=True)

        return summary