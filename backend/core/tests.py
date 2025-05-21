from django.urls import reverse # Though not strictly used due to direct pathing
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Message, Enquiry, Property, Client, Report, Billing
import uuid
from datetime import date, time
from decimal import Decimal

# Helper function to get paginated results data
def get_paginated_results(response_data):
    if 'results' in response_data:
        return response_data['results']
    return response_data # Fallback if not paginated as expected

class MessageViewSetTests(APITestCase):
    def setUp(self):
        self.message1 = Message.objects.create(name="Test User 1", message="Hello World 1")
        self.message2 = Message.objects.create(name="Test User 2", message="Hello World 2")
        self.valid_payload = {'name': 'New User', 'message': 'New Message'}
        self.invalid_payload = {'name': '', 'message': 'Only message'}

    def test_list_messages(self):
        response = self.client.get("/messages/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], self.message1.name)

    def test_retrieve_message(self):
        response = self.client.get(f"/messages/{self.message1.pkid}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.message1.name)

    def test_retrieve_non_existent_message(self):
        response = self.client.get("/messages/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_message_valid_payload(self):
        response = self.client.post("/messages/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Message.objects.count(), 3)
        self.assertEqual(response.data['name'], self.valid_payload['name'])

    def test_create_message_invalid_payload(self):
        response = self.client.post("/messages/", data=self.invalid_payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_message_valid_payload(self):
        update_data = {'name': 'Updated Name', 'message': 'Updated Message'}
        response = self.client.put(f"/messages/{self.message1.pkid}/", data=update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.message1.refresh_from_db()
        self.assertEqual(self.message1.name, update_data['name'])

    def test_update_non_existent_message(self):
        response = self.client.put("/messages/9999/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_destroy_message(self):
        response = self.client.delete(f"/messages/{self.message1.pkid}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Message.objects.count(), 1)

    def test_destroy_non_existent_message(self):
        response = self.client.delete("/messages/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class EnquiryViewSetTests(APITestCase):
    def setUp(self):
        self.enquiry1 = Enquiry.objects.create(name="Enquirer 1", email="e1@example.com", message="Test enquiry 1")
        self.enquiry2 = Enquiry.objects.create(name="Enquirer 2", email="e2@example.com", message="Test enquiry 2")
        self.valid_payload = {'name': 'New Enquirer', 'email': 'new@example.com', 'message': 'A new question.'}
        self.invalid_payload = {'name': 'Bad Enquirer', 'email': 'bademail', 'message': ''} # Invalid email, missing message

    def test_list_enquiries(self):
        response = self.client.get("/enquiries/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 2)
        self.assertEqual(results[0]['name'], self.enquiry2.name) # Default ordering is -created_at

    def test_retrieve_enquiry(self):
        response = self.client.get(f"/enquiries/{self.enquiry1.pkid}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.enquiry1.name)

    def test_retrieve_non_existent_enquiry(self):
        response = self.client.get("/enquiries/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Enquiry not found")

    def test_create_enquiry_valid_payload(self):
        response = self.client.post("/enquiries/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Enquiry.objects.count(), 3)

    def test_create_enquiry_invalid_payload(self):
        # Test with missing message (required field)
        invalid_payload_missing_message = {'name': 'Test', 'email': 'test@example.com'}
        response = self.client.post("/enquiries/", data=invalid_payload_missing_message)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)


    def test_update_enquiry_valid_payload(self):
        update_data = {'name': 'Updated Enquirer', 'message': 'Updated question.'}
        response = self.client.put(f"/enquiries/{self.enquiry1.pkid}/", data=update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.enquiry1.refresh_from_db()
        self.assertEqual(self.enquiry1.name, update_data['name'])

    def test_update_non_existent_enquiry(self):
        response = self.client.put("/enquiries/9999/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_destroy_enquiry(self):
        response = self.client.delete(f"/enquiries/{self.enquiry1.pkid}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK) # View returns 200
        self.assertEqual(response.data['message'], "Enquiry deleted successfully")
        self.assertEqual(Enquiry.objects.count(), 1)

    def test_destroy_non_existent_enquiry(self):
        response = self.client.delete("/enquiries/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PropertyViewSetTests(APITestCase):
    def setUp(self):
        self.property1 = Property.objects.create(title="Beach House", city="Malibu", price=1000000, client_email="test1@example.com")
        self.property2 = Property.objects.create(title="Mountain Cabin", city="Aspen", price=500000)
        self.property3 = Property.objects.create(title="City Apartment", city="New York", price=750000, client_email="test1@example.com")

        self.valid_payload = {
            'title': 'new property', 'description': 'a lovely new place.', 'city': 'Testville',
            'price': 12345, 'advert_type': 'FOR SALE', 'property_type': 'House'
        }

    def test_list_properties(self):
        response = self.client.get("/properties/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 3)

    def test_list_properties_with_client_email_filter(self):
        response = self.client.get("/properties/?client_email=test1@example.com")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 2)
        for prop_data in results:
            self.assertEqual(prop_data['client_email'], "test1@example.com")

    def test_retrieve_property(self):
        response = self.client.get(f"/properties/{self.property1.pkid}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], str.title(self.property1.title)) # Title is title-cased on save

    def test_retrieve_non_existent_property(self):
        response = self.client.get("/properties/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_property_valid_payload(self):
        response = self.client.post("/properties/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Property.objects.count(), 4)
        # Check auto-casing from model's save method
        self.assertEqual(response.data['title'], "New Property")
        self.assertEqual(response.data['description'], "A lovely new place.")
        self.assertIsNotNone(response.data['ref_code'])


    def test_create_property_invalid_payload(self):
        # Missing required 'title'
        invalid_payload = {'city': 'Testville', 'price': 12345}
        response = self.client.post("/properties/", data=invalid_payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('title', response.data)

    def test_update_property_valid_payload(self):
        update_data = {'title': 'updated beach house', 'price': 1200000}
        response = self.client.put(f"/properties/{self.property1.pkid}/", data=update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.property1.refresh_from_db()
        self.assertEqual(self.property1.title, "Updated Beach House") # Title-cased
        self.assertEqual(self.property1.price, 1200000)

    def test_update_non_existent_property(self):
        response = self.client.put("/properties/9999/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_destroy_property(self):
        response = self.client.delete(f"/properties/{self.property1.pkid}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK) # View returns 200
        self.assertEqual(response.data['message'], "Property deleted successfully")
        self.assertEqual(Property.objects.count(), 2)

    def test_destroy_non_existent_property(self):
        response = self.client.delete("/properties/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class BillingViewSetTests(APITestCase):
    def setUp(self):
        # Report needed for Billing ForeignKey
        self.report1 = Report.objects.create(client_name="Client For Billing 1", client_id="clb1", owner_id="org1")
        self.report2 = Report.objects.create(client_name="Client For Billing 2", client_id="clb2", owner_id="org2")

        self.billing1 = Billing.objects.create(report=self.report1, client_name="Client A", client_id="c1", owner_org_id="org1", claim_amount=Decimal("100.00"))
        self.billing2 = Billing.objects.create(report=self.report2, client_name="Client B", client_id="c2", owner_org_id="org2", claim_amount=Decimal("200.00"))
        self.billing3 = Billing.objects.create(client_name="Client C", client_id="c3", owner_org_id="org1", claim_amount=Decimal("150.00"))

        self.valid_payload = {
            'client_name': 'New Billed Client', 'client_id': 'nbc1', 'owner_org_id': 'org_new',
            'claim_amount': '250.50', 'service_date_start': date(2023, 1, 1).isoformat(),
            'service_date_end': date(2023, 1, 2).isoformat()
        }

    def test_list_billings(self):
        response = self.client.get("/billings/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 3)

    def test_list_billings_with_owner_org_id_filter(self):
        response = self.client.get("/billings/?owner_org_id=org1")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 2)
        for item in results:
            self.assertEqual(item['owner_org_id'], "org1")

    def test_retrieve_billing(self):
        response = self.client.get(f"/billings/{self.billing1.pkid}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['client_name'], self.billing1.client_name)

    def test_retrieve_non_existent_billing(self):
        response = self.client.get("/billings/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_billing_valid_payload(self):
        response = self.client.post("/billings/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Billing.objects.count(), 4)
        self.assertEqual(response.data['client_name'], self.valid_payload['client_name'])

    def test_create_billing_invalid_payload(self):
        # Example: Invalid claim_amount
        invalid_payload = self.valid_payload.copy()
        invalid_payload['claim_amount'] = "not-a-number"
        response = self.client.post("/billings/", data=invalid_payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('claim_amount', response.data)

    def test_update_billing_valid_payload(self):
        update_data = {'client_name': 'Updated Billed Client', 'claim_amount': '300.75'}
        response = self.client.put(f"/billings/{self.billing1.pkid}/", data=update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.billing1.refresh_from_db()
        self.assertEqual(self.billing1.client_name, update_data['client_name'])
        self.assertEqual(self.billing1.claim_amount, Decimal('300.75'))

    def test_update_non_existent_billing(self):
        response = self.client.put("/billings/9999/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_destroy_billing(self):
        response = self.client.delete(f"/billings/{self.billing1.pkid}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Billing deleted successfully")
        self.assertEqual(Billing.objects.count(), 2)

    def test_destroy_non_existent_billing(self):
        response = self.client.delete("/billings/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class ClientViewSetTests(APITestCase):
    def setUp(self):
        self.client1_uuid = uuid.uuid4()
        self.client1 = Client.objects.create(id=self.client1_uuid, client_name="Client X", owner_id="owner1", staff_id="staffA", email="clientx@example.com")
        self.client2 = Client.objects.create(client_name="Client Y", owner_id="owner2", staff_id="staffA", email="clienty@example.com")
        self.client3 = Client.objects.create(client_name="Client Z", owner_id="owner1", staff_id="staffB", email="clientz@example.com")

        self.valid_payload = {'client_name': 'New Client Alpha', 'email': 'alpha@example.com'}

    def test_list_clients(self):
        response = self.client.get("/clients/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 3)

    def test_list_clients_filter_by_owner_id(self):
        response = self.client.get("/clients/?owner_id=owner1")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 2)
        for client_data in results:
            self.assertEqual(client_data['owner_id'], "owner1")

    def test_list_clients_filter_by_staff_id(self):
        response = self.client.get("/clients/?staff_id=staffA")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 2)
        for client_data in results:
            self.assertEqual(client_data['staff_id'], "staffA")

    def test_list_clients_filter_by_email(self):
        response = self.client.get("/clients/?email=clientx@example.com")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['email'], "clientx@example.com")

    def test_list_clients_filter_by_client_id(self): # client_id is 'id' (UUID) field
        response = self.client.get(f"/clients/?client_id={self.client1_uuid}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['id'], str(self.client1_uuid))

    def test_retrieve_client(self):
        response = self.client.get(f"/clients/{self.client1.pkid}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['client_name'], self.client1.client_name)

    def test_retrieve_non_existent_client(self):
        response = self.client.get("/clients/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_client_valid_payload(self):
        response = self.client.post("/clients/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Client.objects.count(), 4)

    def test_create_client_invalid_payload(self):
        # Example: Invalid email format
        invalid_payload = {'client_name': 'Bad Client', 'email': 'not-an-email'}
        response = self.client.post("/clients/", data=invalid_payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_update_client_valid_payload(self):
        update_data = {'client_name': 'Updated Client X', 'status': 'Active'}
        response = self.client.put(f"/clients/{self.client1.pkid}/", data=update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client1.refresh_from_db()
        self.assertEqual(self.client1.client_name, update_data['client_name'])
        self.assertEqual(self.client1.status, update_data['status'])

    def test_update_non_existent_client(self):
        response = self.client.put("/clients/9999/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_destroy_client(self):
        response = self.client.delete(f"/clients/{self.client1.pkid}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Client deleted successfully")
        self.assertEqual(Client.objects.count(), 2)

    def test_destroy_non_existent_client(self):
        response = self.client.delete("/clients/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class ReportViewSetTests(APITestCase):
    def setUp(self):
        self.report1 = Report.objects.create(title="Q1 Report", client_id="client1", staff_id="staff1", owner_id="ownerA", report_date=date(2023,3,31))
        self.report2 = Report.objects.create(title="Q2 Report", client_id="client2", staff_id="staff2", owner_id="ownerB", report_date=date(2023,6,30))
        self.report3 = Report.objects.create(title="Client1 Extra Report", client_id="client1", staff_id="staff3", owner_id="ownerA", report_date=date(2023,4,15))

        self.valid_payload = {
            'title': 'Annual Summary', 'client_id': 'client_annual', 'report_type': 'Annual',
            'report_date': date(2023,12,31).isoformat()
        }

    def test_list_reports(self):
        response = self.client.get("/reports/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        # Default ordering in view is not specified, so rely on DRF default or DB default
        # The view's list method uses self.filter_queryset(self.get_queryset()) which might apply default ordering from model Meta
        self.assertEqual(len(results), 3)


    def test_list_reports_filter_by_client_id(self):
        response = self.client.get("/reports/?client_id=client1")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 2) # report1 and report3
        # Check ordering by -created_at as per view logic
        self.assertTrue(results[0]['created_at'] > results[1]['created_at'])
        for report_data in results:
            self.assertEqual(report_data['client_id'], "client1")

    def test_list_reports_filter_by_staff_id(self):
        response = self.client.get("/reports/?staff_id=staff1")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['staff_id'], "staff1")

    def test_list_reports_filter_by_owner_id(self):
        response = self.client.get("/reports/?owner_id=ownerA")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 2)
        for report_data in results:
            self.assertEqual(report_data['owner_id'], "ownerA")

    def test_retrieve_report(self):
        response = self.client.get(f"/reports/{self.report1.pkid}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.report1.title)

    def test_retrieve_non_existent_report(self):
        response = self.client.get("/reports/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_report_valid_payload(self):
        response = self.client.post("/reports/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Report.objects.count(), 4)
        # Test signal created billing
        self.assertTrue(Billing.objects.filter(report__title=self.valid_payload['title']).exists())


    def test_create_report_with_times_calculates_billing_hours_and_amount(self):
        payload = {
            'title': 'Timed Report', 'client_id': 'timed_client', 'report_type': 'Timed',
            'report_date': date(2023,1,1).isoformat(),
            'start_time': time(9,0,0).isoformat(),
            'end_time': time(11,0,0).isoformat(), # 2 hours
            'owner_id': 'test_owner'
        }
        response = self.client.post("/reports/", data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        created_report = Report.objects.get(title='Timed Report')
        self.assertTrue(Billing.objects.filter(report=created_report).exists())
        billing_entry = Billing.objects.get(report=created_report)
        self.assertEqual(billing_entry.worked_hours, Decimal("2.00"))
        self.assertEqual(billing_entry.billed_hours, Decimal("2.00"))
        # Original claim_amount calculation in signal was (end_time.hour - start_time.hour) * 20
        # Corrected calculation in signal uses calculated hours * Decimal("20.00")
        self.assertEqual(billing_entry.claim_amount, Decimal("2.00") * Decimal("20.00"))


    def test_update_report_updates_billing(self):
        # Create a report first
        report_to_update = Report.objects.create(
            title="Initial Report", client_id="upd_client", staff_id="upd_staff",
            owner_id="upd_owner", report_date=date(2023, 5, 1),
            start_time=time(10,0,0), end_time=time(11,0,0) # 1 hour
        )
        # Signal should have created a billing record
        initial_billing = Billing.objects.get(report=report_to_update)
        self.assertEqual(initial_billing.worked_hours, Decimal("1.00"))
        self.assertEqual(initial_billing.claim_amount, Decimal("20.00"))

        update_data = {
            'title': 'Updated Report Title',
            'client_id': report_to_update.client_id, # Keep some fields same for partial update
            'report_date': report_to_update.report_date.isoformat(),
            'start_time': time(10,0,0).isoformat(),
            'end_time': time(13,0,0).isoformat() # 3 hours
        }
        response = self.client.put(f"/reports/{report_to_update.pkid}/", data=update_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        report_to_update.refresh_from_db()
        self.assertEqual(report_to_update.title, "Updated Report Title")

        updated_billing = Billing.objects.get(report=report_to_update)
        self.assertEqual(updated_billing.worked_hours, Decimal("3.00"))
        self.assertEqual(updated_billing.billed_hours, Decimal("3.00"))
        self.assertEqual(updated_billing.claim_amount, Decimal("3.00") * Decimal("20.00"))


    def test_update_non_existent_report(self):
        response = self.client.put("/reports/9999/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_destroy_report(self):
        # Note: Deleting a Report might leave an orphaned Billing record if on_delete is not CASCADE
        # In models.py, Billing.report has on_delete=models.CASCADE, so Billing should be deleted.
        report_pk_to_delete = self.report1.pkid
        self.assertTrue(Billing.objects.filter(report_id=report_pk_to_delete).exists() or not (self.report1.start_time and self.report1.end_time))

        response = self.client.delete(f"/reports/{report_pk_to_delete}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Report deleted successfully")
        self.assertEqual(Report.objects.count(), 2)
        # Check if associated billing is also deleted (due to CASCADE)
        self.assertFalse(Billing.objects.filter(report_id=report_pk_to_delete).exists())


    def test_destroy_non_existent_report(self):
        response = self.client.delete("/reports/9999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PropertySearchAPIViewTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        Property.objects.create(title="Sunny Apartment", description="Bright and airy", city="Sunville", price=1200)
        Property.objects.create(title="Modern Loft", street_address="123 Main St", city="Metrocity", postal_code="MC123", price=2500)
        Property.objects.create(title="Cozy Cottage", description="Quiet retreat in the woods", city="Forestville", property_type="Cottage")

    def test_search_properties_with_results_by_title(self):
        response = self.client.get("/search-properties/?search=Apartment")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['title'], "Sunny Apartment")

    def test_search_properties_with_results_by_city(self):
        response = self.client.get("/search-properties/?search=Metrocity")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['city'], "Metrocity")

    def test_search_properties_with_results_by_description(self):
        response = self.client.get("/search-properties/?search=woods")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['title'], "Cozy Cottage")

    def test_search_properties_no_results(self):
        response = self.client.get("/search-properties/?search=NonExistentTerm")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 0)

    def test_search_properties_no_search_term(self):
        response = self.client.get("/search-properties/") # No 'search' query param
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = get_paginated_results(response.data)
        self.assertEqual(len(results), 0) # Should return Property.objects.none()


class ScrapePropertiesAPIViewTests(APITestCase):
    def test_scrape_properties_current_behavior(self):
        # The view currently has `apartments = []` hardcoded after a commented out `get_apartments`
        # So it should always return an empty list.
        response = self.client.get("/scrapping/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_scrape_properties_with_search_term_current_behavior(self):
        # Even with a search term, the current implementation will return an empty list.
        response = self.client.get("/scrapping/?search=anything")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    # To test the intended behavior (if get_apartments was active and saving properties):
    # from unittest.mock import patch
    # @patch('core.views.get_apartments')
    # def test_scrape_properties_with_mocked_data(self, mock_get_apartments):
    #     mock_scraped_data = [
    #         {'title': 'Scraped Place 1', 'street_address': '1 Scrape St', 'price': 100, 'description': 'Desc 1', 'bathrooms': 1},
    #         {'title': 'Scraped Place 2', 'street_address': '2 Scrape St', 'price': 200, 'description': 'Desc 2', 'bathrooms': 2},
    #     ]
    #     mock_get_apartments.return_value = mock_scraped_data

    #     response = self.client.get("/scrapping/?search=realestate")
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data), 2)
    #     self.assertEqual(Property.objects.count(), 2) # Assuming it saves
    #     self.assertEqual(response.data[0]['title'], 'Scraped Place 1')
    #     mock_get_apartments.assert_called_once_with("realestate")
