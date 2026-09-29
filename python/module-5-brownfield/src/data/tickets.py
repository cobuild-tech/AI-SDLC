from src.models.ticket import Ticket

tickets: list[Ticket] = [
    Ticket(id=101, title="Checkout unavailable", priority="critical", owner="anita", status="in_progress"),
    Ticket(id=102, title="Enterprise SSO setup", priority="high", owner=None, status="open"),
    Ticket(id=103, title="Invoice correction", priority="medium", owner="ravi", status="open"),
    Ticket(id=104, title="Update notification email", priority="normal", owner=None, status="open"),
    Ticket(id=105, title="Export timing out", priority="high", owner="mei", status="in_progress"),
]
