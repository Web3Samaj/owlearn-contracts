# owlearn-contracts

## Adding modules
https://turbo.build/repo/docs/handbook/package-installation

### Adding modules to root
```
yarn add [--dev] package-name -W
```

## Making Changes
https://www.youtube.com/watch?v=puQYAhpfpkA

### Ensure everything is committed
Commit changes made to the package
### Add changes made to package
```
yarn changeset add
```
select the package that was changed
select if it was a major change (breaking change) (hit enter without selecting if changes is minor or patch)
select if it was a minor change (feature addition) (hit enter without selecting if changes is patch)
type the change

### Bump the version
```
yarn changeset version
```

### Commit changes
```
git commit -m "change: DETAILS ABOUT THE CHANGE"
```

### Esnute the package you want to publish doesn't contain a property in package.json
```
{
    ...
    "private": "true"
    ...
}
```

### Publish package
```
yarn changeset publish
```
