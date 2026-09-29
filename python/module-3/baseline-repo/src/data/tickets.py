from src.models.ticket import Ticket

tickets: list[Ticket] = [
    Ticket(id=1, title="Cannot sign in", status="open"),
    Ticket(id=2, title="Invoice total is incorrect", status="in_progress"),
    Ticket(id=3, title="Export completed", status="closed"),
    Ticket(id=4, title="Reset password email missing", status="open"),
]
