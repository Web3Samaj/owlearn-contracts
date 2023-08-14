# contracts

## Setup
Create an `.env` file with enviornment variables. Add following enviornment variables:
```python
INFURA_KEY=
ETHERSCAN_KEY=
PRIVATE_KEY=
MNEMONIC=
POLYGONSCAN_KEY=
OPTIMIZER_RUNS=
COINMARKETCAP_API=
# when running locally, it should always be true
NOT_CI=true
```

## Deploy all contracts

```sh
yarn hardhat deploy --network $NETWORK_NAME
```

## Deploy owlearn ID only

```sh
yarn hardhat deploy --network $NETWORK_NAME --tags OwlearnId
```

## Deploy Educator badge only

```sh
yarn hardhat deploy --network $NETWORK_NAME --tags OwlearnEducatorBadge
```

## Deploy CourseFactory, Course, CourseCertificate and CourseResources

```sh
yarn hardhat deploy --network $NETWORK_NAME -tags OwlearnCourseFactory
```

Note: all contracts are deployed as UUPS upgradeable that is the owner of the contract can upgrade the implementation.

## Mint new Educator badge
```sh
yarn hardhat giveBadge --network $NETWORK_NAME --receiver $RECEIVER_ADDRESS --badge $BADGE_ID
```

for time being, only one badge exist so you can safely use BADGE_ID = 1

## Mint new Owl ID to your own account
```sh
yarn hardhat mintOwlId --network $NETWORK_NAME --name $DOMAIN_NAME 
```

## Create new Course
1. Create a new file in `./config/inputs/$FILENAME.ts` directory with a unique name.
2. Refer to `./config/inputs/exampleInputs.ts` file to find all the necessary field and variables you need.
3. Save the file
4. Run following command
```sh
yarn hardhat createNewCourse --network $NETWORK_NAME --inputs "$FILENAME.ts"
```