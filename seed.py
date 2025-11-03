#!/usr/bin/env python3
# seed.py

from app import app, db, User, Category, Product

def seed_database():
    """Seed the database with users, categories, and 10 products per user"""
    
    with app.app_context():
        # Clear existing data
        print("🗑️  Clearing existing data...")
        db.drop_all()
        db.create_all()
        
        # Create Users
        print("👤 Creating users...")
        
        user1 = User(name='josh')
        user1.password_hash = '1111'
        
        user2 = User(name='dor')
        user2.password_hash = '1111'
        
        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()
        
        print(f"   ✅ Created user: {user1.name}")
        print(f"   ✅ Created user: {user2.name}")
        
        # Create Categories
        print("\n📁 Creating categories...")
        
        cat1 = Category(name='electronics')
        cat2 = Category(name='kitchenware')
        cat3 = Category(name='hardware')
        cat4 = Category(name='officeware')
        
        db.session.add_all([cat1, cat2, cat3, cat4])
        db.session.commit()
        
        print(f"   ✅ Created category: {cat1.name}")
        print(f"   ✅ Created category: {cat2.name}")
        print(f"   ✅ Created category: {cat3.name}")
        print(f"   ✅ Created category: {cat4.name}")

        # Create 10 Products per User
        print("\n📦 Creating 10 products per user...")
        
        # Josh's Products (user_id=1)
        josh_products = [
            Product(name='Laptop', category_id=1, user_id=1),
            Product(name='Phone', category_id=1, user_id=1),
            Product(name='Tablet', category_id=1, user_id=1),
            Product(name='Fridge', category_id=2, user_id=1),
            Product(name='Oven', category_id=2, user_id=1),
            Product(name='Blender', category_id=2, user_id=1),
            Product(name='Drill', category_id=3, user_id=1),
            Product(name='Hammer', category_id=3, user_id=1),
            Product(name='Chair', category_id=4, user_id=1),
            Product(name='Desk', category_id=4, user_id=1),
        ]
        
        # Dor's Products (user_id=2)
        dor_products = [
            Product(name='Monitor', category_id=1, user_id=2),
            Product(name='Keyboard', category_id=1, user_id=2),
            Product(name='Mouse', category_id=1, user_id=2),
            Product(name='Microwave', category_id=2, user_id=2),
            Product(name='Toaster', category_id=2, user_id=2),
            Product(name='Mixer', category_id=2, user_id=2),
            Product(name='Screwdriver', category_id=3, user_id=2),
            Product(name='Wrench', category_id=3, user_id=2),
            Product(name='Lamp', category_id=4, user_id=2),
            Product(name='Printer', category_id=4, user_id=2),
        ]
        
        all_products = josh_products + dor_products
        db.session.add_all(all_products)
        db.session.commit()

        print(f"   ✅ Added 10 products for josh")
        print(f"   ✅ Added 10 products for dor")

        print("\n✨ Seeding complete!")
        print("\n📝 Login credentials:")
        print("   Username: josh | Password: 1111")
        print("   Username: dor  | Password: 1111")
        print(f"   📊 Total Products: {len(all_products)}")

if __name__ == '__main__':
    seed_database()