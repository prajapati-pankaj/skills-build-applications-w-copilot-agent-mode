from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        # Create users (super heroes)
        marvel_heroes = [
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'first_name': 'Tony', 'last_name': 'Stark'},
            {'username': 'captainamerica', 'email': 'cap@marvel.com', 'first_name': 'Steve', 'last_name': 'Rogers'},
            {'username': 'spiderman', 'email': 'spidey@marvel.com', 'first_name': 'Peter', 'last_name': 'Parker'},
        ]
        dc_heroes = [
            {'username': 'batman', 'email': 'batman@dc.com', 'first_name': 'Bruce', 'last_name': 'Wayne'},
            {'username': 'superman', 'email': 'superman@dc.com', 'first_name': 'Clark', 'last_name': 'Kent'},
            {'username': 'wonderwoman', 'email': 'wonderwoman@dc.com', 'first_name': 'Diana', 'last_name': 'Prince'},
        ]
        marvel_users = [User.objects.create_user(**hero, password='password') for hero in marvel_heroes]
        dc_users = [User.objects.create_user(**hero, password='password') for hero in dc_heroes]

        # Create teams
        marvel_team = Team.objects.create(name='Team Marvel')
        marvel_team.members.set(marvel_users)
        dc_team = Team.objects.create(name='Team DC')
        dc_team.members.set(dc_users)

        # Create workouts
        workout1 = Workout.objects.create(name='Pushups', description='Pushups for strength', suggested_for='strength', duration=10, calories=50)
        workout2 = Workout.objects.create(name='Running', description='Running for stamina', suggested_for='stamina', duration=30, calories=200)
        workout3 = Workout.objects.create(name='Yoga', description='Yoga for flexibility', suggested_for='flexibility', duration=20, calories=70)

        # Create activities
        Activity.objects.create(user=marvel_users[0], activity_type='Pushups', duration=10, calories_burned=50, date=timezone.now().date(), team=marvel_team)
        Activity.objects.create(user=marvel_users[1], activity_type='Running', duration=30, calories_burned=200, date=timezone.now().date(), team=marvel_team)
        Activity.objects.create(user=dc_users[0], activity_type='Yoga', duration=20, calories_burned=70, date=timezone.now().date(), team=dc_team)
        Activity.objects.create(user=dc_users[1], activity_type='Pushups', duration=10, calories_burned=50, date=timezone.now().date(), team=dc_team)

        # Create leaderboard
        Leaderboard.objects.create(team=marvel_team, total_points=250, week=timezone.now().date())
        Leaderboard.objects.create(team=dc_team, total_points=120, week=timezone.now().date())

        self.stdout.write(self.style.SUCCESS('Test data populated successfully!'))
