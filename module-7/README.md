# Support ticket service

A small workshop repository used to practice security review of agent-generated changes.

## Commands

```bash
npm test
npm run lint
npm run security
```

Do not run `npm install`. These commands use only Node.js built-ins and run
without installing anything. On the `unsafe-change` and `answer-key`
branches, `package.json` deliberately lists an unapproved dependency
(`@acme/secure-export-helper`) that does not exist in any registry -- that is
one of the exercise's planted findings, not a real requirement, and
`npm install` will fail with a 404 if you try it.

Use only approved dependencies listed in `docs/approved-dependencies.md`.

