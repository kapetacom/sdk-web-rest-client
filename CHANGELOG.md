# [2.1.0](https://github.com/kapetacom/sdk-web-rest-client/compare/v2.0.2...v2.1.0) (2024-01-22)


### Features

* Use rest client from shared lib ([#10](https://github.com/kapetacom/sdk-web-rest-client/issues/10)) ([21c6b61](https://github.com/kapetacom/sdk-web-rest-client/commit/21c6b61057b06045298860b75daa2a885f74001d))

## [2.0.2](https://github.com/kapetacom/sdk-web-rest-client/compare/v2.0.1...v2.0.2) (2024-01-16)


### Bug Fixes

* Format codebase ([cc6d895](https://github.com/kapetacom/sdk-web-rest-client/commit/cc6d895a6b792a6cb895635ebbcc179cc0fee593))
* Handle Set and Map in query transport ([06e3932](https://github.com/kapetacom/sdk-web-rest-client/commit/06e39327386468377750cfddd2c08cf3779855cc))

## [2.0.1](https://github.com/kapetacom/sdk-web-rest-client/compare/v2.0.0...v2.0.1) (2024-01-05)


### Bug Fixes

* Do not send values that are null or undefined ([#8](https://github.com/kapetacom/sdk-web-rest-client/issues/8)) ([857b120](https://github.com/kapetacom/sdk-web-rest-client/commit/857b120a840dd0efca0f67e4a30efbcc1d8c4542))

# [2.0.0](https://github.com/kapetacom/sdk-web-rest-client/compare/v1.1.0...v2.0.0) (2024-01-02)


### Features

* Prefix all internal methods with $ to avoid name clashes ([#7](https://github.com/kapetacom/sdk-web-rest-client/issues/7)) ([24a36fa](https://github.com/kapetacom/sdk-web-rest-client/commit/24a36fa65049b38292c4ea7c0196e32df0fc90a8))


### BREAKING CHANGES

* We generate methods names which can be named anything

# [1.1.0](https://github.com/kapetacom/sdk-web-rest-client/compare/v1.0.7...v1.1.0) (2023-12-12)


### Features

* Add Request object and options to adjust requests before sending ([#6](https://github.com/kapetacom/sdk-web-rest-client/issues/6)) ([a186ebe](https://github.com/kapetacom/sdk-web-rest-client/commit/a186ebe1b520b082b2064d7fee546f72e0673966))

## [1.0.7](https://github.com/kapetacom/sdk-web-rest-client/compare/v1.0.6...v1.0.7) (2023-10-18)


### Bug Fixes

* Change dates to numbers when serializing ([#4](https://github.com/kapetacom/sdk-web-rest-client/issues/4)) ([41c3573](https://github.com/kapetacom/sdk-web-rest-client/commit/41c3573864f6944e73017a355f29a4146b27ded0))

## [1.0.6](https://github.com/kapetacom/sdk-web-rest-client/compare/v1.0.5...v1.0.6) (2023-09-13)


### Bug Fixes

* Widen the type boundary for ReturnData ([1c12b02](https://github.com/kapetacom/sdk-web-rest-client/commit/1c12b02fdf54d92c0cce591fe2415515af1086c8))

## [1.0.5](https://github.com/kapetacom/sdk-web-rest-client/compare/v1.0.4...v1.0.5) (2023-09-13)


### Bug Fixes

* Change execute to be a generic function ([8413c61](https://github.com/kapetacom/sdk-web-rest-client/commit/8413c61bb6ee33b4af03bb36a3cde492ea24b4ec))

## [1.0.4](https://github.com/kapetacom/sdk-web-rest-client/compare/v1.0.3...v1.0.4) (2023-06-18)


### Bug Fixes

* Only parse json if content type matches and it is non-empty ([1b70c6a](https://github.com/kapetacom/sdk-web-rest-client/commit/1b70c6a6bf075ab64bcba18f62365d8733b4af90))

## [1.0.3](https://github.com/kapetacom/sdk-web-rest-client/compare/v1.0.2...v1.0.3) (2023-06-18)


### Bug Fixes

* Only parse as JSON when content type is json ([218d85b](https://github.com/kapetacom/sdk-web-rest-client/commit/218d85bec18462809c3792756dc03dcbbe3d600d))

## [1.0.2](https://github.com/kapetacom/sdk-web-rest-client/compare/v1.0.1...v1.0.2) (2023-06-18)


### Bug Fixes

* Throw errors when request fails ([1f22c9e](https://github.com/kapetacom/sdk-web-rest-client/commit/1f22c9e2096ef9a7f87a06a837509e51e56f8874))

## [1.0.1](https://github.com/kapetacom/sdk-web-rest-client/compare/v1.0.0...v1.0.1) (2023-06-17)

### Bug Fixes

-   Make transport case insensitive ([e40e47d](https://github.com/kapetacom/sdk-web-rest-client/commit/e40e47d1af8aadec8235990da7a5ba6a60730bd9))

# 1.0.0 (2023-06-17)

### Features

-   Change to use typescript ([#1](https://github.com/kapetacom/sdk-web-rest-client/issues/1)) ([03320ae](https://github.com/kapetacom/sdk-web-rest-client/commit/03320ae86d0cc9ad32c8497bb2417a6f1b8b590c))
