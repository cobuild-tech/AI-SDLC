import json
import unittest

from langchain_core.messages import AIMessage

from ticket_agent.graph import build_graph, run_ticket


class DemoTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.graph = build_graph()

    def test_vpn_uses_real_graph_tools_and_cited_article(self):
        result = run_ticket(self.graph, {"id": "T1", "subject": "VPN drops", "description": "Disconnects after a minute"})
        self.assertEqual(result["status"], "suggested_resolution")
        self.assertEqual(result["citations"], ["KB-VPN-01"])
        self.assertEqual([t["tool"] for t in result["tool_trace"]], ["search_kb", "read_article"])

    def test_urgent_and_unclear_handoff(self):
        for ticket in [
            {"id": "T2", "subject": "Production outage", "description": "All users cannot sign in"},
            {"id": "T3", "subject": "Help", "description": "Something is broken"},
        ]:
            with self.subTest(ticket=ticket["id"]):
                result = run_ticket(self.graph, ticket)
                self.assertEqual(result["status"], "needs_human")
                self.assertEqual(result["tool_trace"], [])

    def test_claimed_citation_without_reading_is_rejected(self):
        graph = build_graph(agent_fn=lambda messages, triage: AIMessage(content=json.dumps({
            "resolution": "Try a reset", "citations": ["KB-VPN-01"], "needs_human": False})))
        result = run_ticket(graph, {"id": "T4", "subject": "VPN", "description": "Cannot connect"})
        self.assertEqual(result["status"], "needs_human")

    def test_major_incident_rule_overrides_bad_classifier(self):
        graph = build_graph(triage_fn=lambda ticket: {"category": "vpn", "priority": "P3"})
        result = run_ticket(graph, {"id": "T5", "subject": "Production outage", "description": "All users affected"})
        self.assertEqual(result["status"], "needs_human")
        self.assertEqual(result["triage"]["priority"], "P1")


if __name__ == "__main__":
    unittest.main()
