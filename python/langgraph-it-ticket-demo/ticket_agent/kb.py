"""Small, inspectable local KB. Search is lexical to keep the lab focused on agents."""

import json
import re
from pathlib import Path


def load_articles(path: Path) -> list[dict]:
    articles = json.loads(path.read_text(encoding="utf-8"))
    ids = [item["id"] for item in articles]
    if len(ids) != len(set(ids)):
        raise ValueError("KB article IDs must be unique")
    return articles


def search(articles: list[dict], query: str, category: str) -> list[dict]:
    words = set(re.findall(r"[a-z0-9]+", query.lower())) - {
        "the", "and", "for", "my", "this", "with", "not", "can", "please", "issue"
    }
    ranked = []
    for article in articles:
        if category != "other" and article["category"] != category:
            continue
        haystack = (article["title"] + " " + article["symptoms"]).lower()
        score = sum(word in haystack for word in words)
        ranked.append((score, article))
    ranked.sort(key=lambda x: (-x[0], x[1]["id"]))
    return [{"id": article["id"], "title": article["title"], "symptoms": article["symptoms"]}
            for score, article in ranked if score > 0][:3]
