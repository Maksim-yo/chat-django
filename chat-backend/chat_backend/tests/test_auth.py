from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from accounts.models import ChatUser
from accounts.token_auth import create_token  # Your custom token creation method

class AuthTests(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.signup_url = reverse('accounts:signup')
        self.logout_url = reverse('accounts:logout')
        self.profile_url = reverse('accounts:profile')

        # Create a user
        self.user = ChatUser.objects.create(nickname='testuser', password='testpassword', email='test@example.com')

        # Create a token for the user
        self.token = create_token(self.user)

    def test_signup(self):
        data = {
            'nickname': 'newuser',
            'password': 'Newpassword123',
            'email': 'newuser@example.com'
        }
        response = self.client.post(self.signup_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)

    def test_logout(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Successfully logged out.')

    def test_profile_get(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.user.email)
        self.assertEqual(response.data['nickname'], self.user.nickname)

    def test_profile_post(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        data = {
            'nickname': 'newnickname',
            # 'avatar': <some file object> if testing file uploads
        }
        response = self.client.post(self.profile_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Successfully updated.')

        # Refresh from db
        self.user.refresh_from_db()
        self.assertEqual(self.user.nickname, 'newnickname')
