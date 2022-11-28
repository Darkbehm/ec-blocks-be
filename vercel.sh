#!/bin/bash
if [[ $VERCEL_GIT_COMMIT_REF == "main"  ]] ; then
  echo "This is our main branch"
  yarn start:prod
else
  echo "This is not our main branch"
  yarn start:dev
fi
