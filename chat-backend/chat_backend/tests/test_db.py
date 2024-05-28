from django.test import TestCase
from accounts.models import ChatUser

class DatabaseTests(TestCase):

    def setUp(self):
        self.user = ChatUser.objects.create(nickname='testuser', password='testpassword', email='test@example.com')

    def test_user_creation(self):
        user = ChatUser.objects.create(nickname='newuser', password='newpassword', email='newuser@example.com')
        self.assertEqual(user.nickname, 'newuser')
        self.assertEqual(user.email, 'newuser@example.com')



    def test_user_update(self):
        self.user.nickname = 'updateduser'
        self.user.save()
        self.user.refresh_from_db()
        self.assertEqual(self.user.nickname, 'updateduser')

    def test_profile_update(self):
        self.user.nickname = 'updatednickname'
        self.user.save()
        self.user.refresh_from_db()
        self.assertEqual(self.user.nickname, 'updatednickname')

    def test_user_deletion(self):
        user_id = self.user.id
        self.user.delete()
        with self.assertRaises(ChatUser.DoesNotExist):
            ChatUser.objects.get(id=user_id)

    def test_profile_deletion(self):
        profile_id = self.user.id
        self.user.delete()
        with self.assertRaises(ChatUser.DoesNotExist):
            ChatUser.objects.get(id=profile_id)
