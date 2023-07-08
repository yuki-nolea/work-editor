# work-editor project

This project uses Quarkus, the Supersonic Subatomic Java Framework.

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .


## 実行方法（開発モード）
以下、Windowsのみ対応しています。

quarkusとvueは別々のコンソールで起動します。

まず、vueを起動するためにsrc/main/webappにマウントします。
```
cd work-editor/src/main/webapp
```

Nodeのモジュールをインストールするために以下のコマンドを実行してください。
```
yarn install
```

そして、次のコマンドを入力してvueを起動します。
```
yarn run watch
```

次に、別のコンソールを開き、以下のコマンドを入力してquarkusを実行します。
```
mvnw quarkus:dev
```

実行したら、`localhost:8080`にアクセス可能です。




## Running the application in dev mode

You can run your application in dev mode that enables live coding using:
```
./mvnw quarkus:dev
```

## Packaging and running the application

The application can be packaged using `./mvnw package`.
It produces the `work-editor-1.0-SNAPSHOT-runner.jar` file in the `/target` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/lib` directory.

The application is now runnable using `java -jar target/work-editor-1.0-SNAPSHOT-runner.jar`.

## Creating a native executable

You can create a native executable using: `./mvnw package -Pnative`.

Or, if you don't have GraalVM installed, you can run the native executable build in a container using: `./mvnw package -Pnative -Dquarkus.native.container-build=true`.

You can then execute your native executable with: `./target/work-editor-1.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult https://quarkus.io/guides/building-native-image.