# Note writer
Simple note writing app.Demonstrating CRUD operations.

# Run locally
Clone the repo
```
git clone https://github.com/afaiyaz006/Note-Write
```
Install dependencies
```
npm install
```
Run
```
npm run dev
```
Create a file named ```.env.local```. Create a <a href="https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps#building-a-github-app">github app</a> and add  github ID and github secrets.Add following information to ```.env.local``` 
```
NEXTAUTH_SECRET="ANYTHING"
GITHUB_ID="ID"
GITHUB_SECRET="SECRET"
```


# Libraries used
1. Database : Sqlite
2. ORM : Drizzle ORM
3. Authentication : next-auth (Added github as login provider so login with github only)
4. Frontend + Backend : NextJS (using latest App based routing) 
5. CSS : Tailwind CSS+ Daisy UI
# Is this app secure?
NO
# Screenshots

![](screenshots/homepage.png)
![](/screenshots/form.png)
![](screenshots/notes.png)



