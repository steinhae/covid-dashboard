# Covid Dashboard

Covid-19 dashboard to show statistics based on RKI data. RKI updates data regulary. Currently, showing data for Landkreis Goslar.
Deployed at https://covid-status.de/.

## Development

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

## Build

### Development image

Execute `docker build -f Dockerfile -t lk-covid:dev .` to build a local devolpment docker image.

### Production image

Execute `docker build -f Dockerfile.prod -t lk-covid:latest .` to build a production docker image.

## Deployment

After building the production docker image, execute the following steps to deploy it to AWS: 

`docker tag lk-covid {ACCOUNT_ID}.dkr.ecr.eu-central-1.amazonaws.com/lk-covid:latest` 

`docker push {ACCOUNT_ID}.dkr.ecr.eu-central-1.amazonaws.com/lk-covid:latest` 

`ssh -i ~/.ssh/{PEM_FILE} -t {USER}@covid-status.de './rebuild.sh'` 