## Image Vault

A place for museums, archives, and cultural organizations to share their collections.

- Sign up as an organization to share media
- Join as a user to collect and download interesting historical images
- Search and filter the catalog by date, location, organization, and more.

Currently being developed by @LucileTech, @FlapShatner, @jameswonlee, and @dejmedus as part of an agile process with [Chingu voyages](https://www.chingu.io/)!

### Built with

- [Next.js](https://nextjs.org/) full-stack React framework
- [TypeScript](https://www.typescriptlang.org/) a strongly typed programming language that builds on JavaScript
- [NextAuth.js](https://next-auth.js.org/) & Google OAuth
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- CSS

### Local Setup

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) [v44-tier3-team-37](https://github.com/chingu-voyages/v44-tier3-team-37/tree/main)
2. [Create a local clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository) of the forked repository
3. Using the terminal, move into your local copy

```shell
cd v44-tier3-team-37
```
4. Install dependencies
```
npm i
```
5. Provide environment variables
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
DATABASE_URL=
MONGODB_URI=
NEXTAUTH_SECRET=
```
6. Generate Prisma schema
```
npx prisma generate
```
7. Run the app

```shell
npm run dev
```
### Contributing
1. Create a new branch
```shell
git checkout -b 'your-branch-name'
```
2. Make changes.
3. Push your branch to the upstream repo
```shell
git push origin your-branch-name
```
🎉 Follow the link provided to create a pull request