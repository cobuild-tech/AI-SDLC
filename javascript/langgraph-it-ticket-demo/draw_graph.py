"""Render the ticket graph to a PNG (uses the mermaid.ink rendering service)."""

from pathlib import Path

from ticket_agent.graph import build_graph

OUT = Path(__file__).parent / "graph.png"


def main() -> None:
    OUT.write_bytes(build_graph().get_graph().draw_mermaid_png())
    print(f"Saved {OUT}")


if __name__ == "__main__":
    main()
