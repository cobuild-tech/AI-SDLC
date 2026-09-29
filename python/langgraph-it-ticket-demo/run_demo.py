"""CLI for one ticket or the supplied set."""

import argparse
import json
import os
from pathlib import Path

from dotenv import load_dotenv

from ticket_agent.graph import PROVIDERS, build_graph, run_ticket


def main() -> None:
    load_dotenv(Path(__file__).parent / ".env")
    parser = argparse.ArgumentParser(description="LangGraph IT ticket demo")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--live", action="store_const", const="live", dest="mode",
                      help="Use a real LLM instead of scripted mock decisions")
    mode.add_argument("--mock", action="store_const", const="mock", dest="mode",
                      help="Use scripted mock decisions (no API key needed)")
    parser.add_argument("--provider", choices=list(PROVIDERS), default=os.getenv("LLM_PROVIDER", "openrouter"),
                        help="LLM provider for live mode (default: LLM_PROVIDER or openrouter)")
    parser.add_argument("--ticket", help="Free-text ticket to run instead of sample tickets")
    parser.set_defaults(mode=os.getenv("DEMO_MODE", "mock").strip().lower())
    args = parser.parse_args()
    if args.mode not in ("mock", "live"):
        parser.error(f"DEMO_MODE must be mock or live, not {args.mode!r}")
    graph = build_graph(mode=args.mode, provider=args.provider)
    tickets = ([{"id": "T-CUSTOM", "subject": "Custom ticket", "description": args.ticket}]
               if args.ticket else json.loads((Path(__file__).parent / "tickets.json").read_text()))
    for ticket in tickets:
        print(f"\n{ticket['id']}: {ticket['subject']}")
        print(json.dumps(run_ticket(graph, ticket), indent=2))


if __name__ == "__main__":
    main()
