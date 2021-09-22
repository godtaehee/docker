## 가상화 기술이 나오기 전

가상화 기술이 나오기 전에는 한대의 서버를 하나의 용도로만 사용했다.

남는 서버 공간을 그대로 방치하고, 하나의 서버에 하나의 운영체제와 하나의 프로그램만을 운영하여 비효율적으로 운영하였다.

## 하이퍼 바이저 기반의 가상화 출현

논리적으로 공간을 분할하여 VM이라는 독립적인 가상 환경의 서버가 이용 가능해졌다.

하이퍼 바이저는 호스트 시스템에서 다수의 게스트 OS를 구동할 수 있게 하는 소프트웨어이며 하드웨어를 가상화하면서 하드웨어와 각각의 VM을 모니터링하는 중간 관리자이다.

## docker ps

현재 실행중인 컨테이너 나열

ps는 process status의 줄임말

## docker run

docker run = docker create <이미지 이름> + docker start <컨테이너 아이디/이름>

## docker create 이미지이름

docker create 할때 컨테이너의 하드디스크에 파일 스냅샷을 넣어준다.

## docker start 컨테이너 아이디/이름

docker start 할때 시작시 실행 될 명령어를 이용해 컨테이너를 실행한다.

docker start -a를 해줘야 docker container의 output을 화면에 출력을 해준다.

## docker stop 혹은 kill <중지할 컨테이너 아이디/이름>

**stop**은 gracefully하게 중지

→ 메시지를 보내고 있었다면 보내고 있던 메시지를 보내고 나서 중지

**kill은 Stop과 달리 어떠한 것도 기다리지 않고 컨테이너를 중지시킴**

## docker rm <아이디/이름>

실행중인 컨테이너는 **먼저 중지한 후**에 삭제 가능

- docker rm 'docker ps -a -q' ← 한번에 지우는거
- docker rmi <이미지 id>
- docker system prune 한번에 컨테이너, 이미지 네트워크 모두 삭제하고 싶다면? 실행중이지 않은것만 삭제가능

## docker exec <컨테이너 아이디> <명령어>

이미 실행중인 컨테이너에 명령어를 전달하고 싶다면? 위의 명령어를 사용

**docker run vs docker exec**

1. docker run 은 새로 컨테이너를 만들어서 실행
2. docker exec은 이미 실행중인 컨테이너에 명령어를 전달

## Redis

### Redis란?

Redis(REmote Dictionary Server)는 메모리 기반의 키-값 구조데이터 관리 시스템이며, 모든 데이터를 메모리에 저장하고 빠르게 조회할수 있는 비관계형 데이터베이스(NoSQL)이다.

### Redis를 쓰는 이유?

메모리에 저장하기 때문에 Mysql같은 데이터베이스에 데이터를 저장하는 것과 데이터를 불러올때 훨씬 빠르게 처리할수가 있으며, 비록 메모리에 저장하지만 영속적으로 보관이 가능하다. 그래서 서버를 재부팅해도 데이터를 유지할수 있는 장점이 있다.

### Redis 실행과정 (Node.js)

- 먼저 redis-server를 작동시켜주셔야 합니다.
- 그리고 Redis 모듈을 다운받습니다.
- 레디스 모듈을 받은 후 레디스 클라이언트를 생성하기 위해서 Redis에서 제공하는 createClient() 함수를 이용해서 redis.createClient로 레디스 클라이언트를 생성해준다.
- 하지만 여기서 redis server가 작동하는 곳과 Node.js앱이 작동하는곳이 다른 곳이라면 host와 port 인자를 명시해주어야한다.

### Redis 실행과정 (Docker)

레디스(redis) 서버 작동 → 레디스 클라이언트(redis-cli)실행 → 레디스 클라이언트에게 명령어를 입력하여 레디스 서버에 전달

Redis서버 실행후 터미널 하나 더 켜서 Redis-cli를 입력하면 실행되지않는다. 왜냐하면 Redis서버는 **컨테이너 안**에서 실행되고있는데 Redis-cli를 실행한 곳은 컨테이너의 바깥인 그냥 터미널에서 실행을 시켰기때문이다.

docker exec -it <redis 컨테이너 ID> redis-cli

-it를 붙여줘야 명령어를 실행한 후 계속 명령어를 적을수 있다.

-i : interactive 상호적인

-t : terminal의 약자

설정 : set key1 test

얻어오기: get key1

### 컨테이너 안의 shell 키기

docker exec -it <컨테이너아이디> <명령어>로 매번 명령어를 실행할때마다 저걸 다치면 매우 번거롭다

그래서 아예 터미널을 켜주게하는게 docker exec -it <컨테이너 아이디> <sh,bash,zsh,powershell>이다

윈도우에서는 파워쉘을 사용 보편적으로 sh가 사용가능

## Dockerfile이란?

Dockerfile이란 Docker Image를 만들기 위한 설정 파일이며 컨테이너가 어떻게 행동해야 하는지에 대한 설정들을 정의해줍니다.

## Dockerfile 만드는 순서

1. 도커 이미지가 필요한 것이 무엇인지를 생각하기
2. 베이스 이미지를 명시해준다. (파일 스냅샷에 해당)
    1. 베이스 이미지란?
        1. 도커 이미지는 여러개의 레이어로 되어있다. 그중에서 베이스 이미지는 이 이미지의 기반이 되는 부분이다. 레이어는 중간 단계의 이미지라고 생각하면 됨
        2. 간단히 베이스 이미지는 OS라고 생각하면된다.
3. 추가적으로 필요한 파일을 다운 받기 위한 몇가지 명령어를 명시해준다. (파일 스냅샷에 해당)
4. 컨테이너 시작시 실행 될 명령어를 명시해준다. (시작시 실행 될 명령어에 해당)

## Dockerfile 실제로 만들기

파일 이름은 Dockerfile이여야만 함
나중에 더 개발환경만을 위한 Dockerfile을 만들고 싶다면 Dockerfile.dev를 사용해야한다.

```dockerfile
# 베이스 이름을 명시해준다.
# FROM은 이미지 생성시 기반이 되는 이미지 레이어입니다.
# <이미지 이름>: <태그> 형식을 ㅗ작성
# 태그를 안붙이면 자동적으로 가장 최신것으로 다운 받음
# ex) ubuntu:14.04
FROM baseImage

# 추가적으로 필요한 파일들을 다운로드 받는다.
# 도커이미지가 생성되기 전에 수행할 쉘 명령어
# 베이스 이미지 외에 다른것을 더 첨가해주는 용도로도 사용
RUN command

# 컨테이너 시작시 실행 될 명령어를 명시해준다.
# 컨테이너가 시작되었을 때 실행할 실행 파일 또는 쉘 스크립트입니다.
# 해당 명령어는 DockerFile내 1회만 사용 가능합니다.
CMD ["executable"]
```

## 도커 파일을 통해 실제 이미지를 생성하는 과정

`Dockerfile` -> `도커 클라이언트` -> `도커 서버` -> `이미지`

### docker build .
위의 명령어를 통해 도커 파일에 입력된 것들일 도커 클라이언트에 전달되어서 도커 서버가 인식하게 하여야 한다. 

build 명령어는 해당 디렉토리 내에서 `Dockerfile`이라는 파일을 찾아서 도커 클라이언트에게 전달시켜준다.

`docker build ./` 이렇게 슬래시(/)까지 해주는것을 권장

### docker build . 후에 일어나는 일
베이스 이미지를 임시 컨테이너에 넣어줌 만약 그 외의 레이어들이 있다면(Dockerfile의 RUN부분) 그것또한 넣어준다.

이 임시컨테이너를 기반으로 새로운 이미지가 생성된다.

## 생성한 DockerImage 이름 부여하기

`docker build -t 나의 도커 아이디/저장소/프로젝트 이름:버전 ./`
이렇게 빌드를 하게되면 이름을 가지고 빌드를 할수 있게된다.

t는 tag의 약자이다.

## Node.js 애플리케이션 Docker로 실행하기

Nodejs 애플리케이션이 있는 디렉토리를 기준으로 Dockerfile을 생성한다.

생성한 Dockerfile의 내용은 다음과 같다.

```dockerfile
FROM node:10

RUN npm i

CMD ["node", "server.js"]
```

이건 오류가 난다. 왜냐하면 node:10이라는 이미지에는 내가 만든 Node.js의 Application의 package.json과 Entry file인 Server.js가 없기 때문이다.

package.json파일이 없는데 npm i 하면 당연히 오류가 난다.

그래서 바꿔준게

```dockerfile
FROM node:10

COPY package.json ./

RUN npm i

CMD ["node", "server.js"]
```

이것도 오류가 난다. 오류를 설명하기 이전에 COPY라는 명령어가 있는데

이 명령어는 현재 Dockerfile이 있는 디렉토리 기준으로 package.json파일을 찾아 DockerImage내의 하드디스크 루트폴더로 복사를 해준다.

그렇게 하게되면 내가 만든 Node.js Application의 package.json파일이 DockerImage에도 존재하게 되므로 npm i 명령을 실행할수 있게된다. 하지만 server.js는 없기때문에 node server.js라는 명령어를 실행할수 없다.

```dockerfile
FROM node:10

COPY ./ ./

RUN npm i

CMD ["node", "server.js"]
```

최종본은 이것인데 그냥 Dockerfile이 있는 디렉토리 기준에 있는 모든 파일을 DockerImage 하드디스크의 루트 디렉토리에 복사하는것이다.

이렇게 되면 package.json, server.js가 모두 DockerImage내에 존재하게 되므로 Node.js Application을 정상적으로 실행할수 있게된다. 하지만 여기서 실제 간단한 GET API를 호출해보면 실행되지 않는다.

이유는 컨테이너 내부에있는 네트워크와 우리가 사용하고있는 실제 우리 컴퓨터의 네트워크의 매칭이 되어있지가 않아서인데 다음과 같은 명령어로 네트워크를 매칭시켜서 컨테이너로 실행한 Node.js Application의 API를 이용할수 있다.

`docker run -p <내컴퓨터에서사용할 포트번호>:<Docker Container에서 실행되는 애플리케이션의 포트번호> <이미지 이름>`

예를들어 우리가 앞서 만든 Node.js Application이 사용하는 port는 `8080`이였는데 Docker에서 돌아가는 애플리케이션의 포트와는 상관없이 내 컴퓨터에서 사용할 포트번호를 8080이 아닌 다른것으로도 매칭을 시켜 사용할수 있다. 무슨말이냐면

`docker run -p 5000:8080 some-docker-image`

이 명령어는 `some-docker-image`라는 이미지 안에 있는 애플리케이션의 네트워크 포트번호 8080을 내 컴퓨터에서는 5000번으로 사용을 하여 실행시키겠다 라는 말이다.

즉 로컬에서 간단하게 앱을 돌린다고 가정할때 `http://localhost:5000`으로 접속하면 docker에서 실행되고있는 앱의 API를 이용할수 있게된다.

## WORKDIR

이미지 안에서 어플리케이션 소스 코드를 가지고 있을 디렉토리를 생성하는 것입니다. 그리고 이 디렉토리가 어플리케이션에 `working directory`가 됩니다.

### 왜 따로 working directory가 필요한가?

1. baseImage로 만든 Container의 루트 폴더에는 기존에 제공하는 다양한 폴더, 파일이 있을수 있다. 근데 만약 이러한 폴더와 파일이 애초에 많았다면 우리가 만든 애플리케이션의 파일과 폴더 또한 루트폴더에 들어가서 파일과 폴더가 두배로 많아져 첫째로 가독성이 떨어지며, 분리되어있지않아서 어떤게 내가 만든 애플리케이션의 파일인지 구분이 안될수가 있다.

1. 혹시 내가 만든 애플리케이션의 파일 이름이 원래 이미지에 있던 파일과 이름이 같다면?

ex) 베이스 이미지에 이미 home이라는 폴더가 있는데 COPY명령어를 통해서 새로 추가 되는 폴더 중에 home이라는 폴더가 있다면 중복이 되므로 원래있던 폴더가 덮어 씌어져 버린다. 이건 참 큰일날 문제다.

이러한 이유때문에 working directory가 따로 필요한것이다.

> working directory를 설정하게 되면 shell을 통해 컨테이너를 실행할때 루트디렉토리(/)로 들어가는게 아니라 working directory로 설정해놓은 폴더로 바로 들어가게 된다.
 
 
## 어플리케이션 소스 변경으로 다시 빌드하는 것에 대한 문제점

애플리케이션을 만들다 보면 소스 코드를 계속 변경시켜줘야 하며 그에 따라서 변경된 부분을 확인하면서 개발을 해나가야한다.

그래서 도커를 이용해서 어떻게 실시간으로 소스코드 반영이 이루어지는지 알아보겠습니다.

`-d`옵션을 사용하게되면 컨테이너를 실행시킨후 바로 다시 프롬프트상태로 돌아올수 있습니다.

### docker build시 using cache

docker build를 가지고 똑같은 애플리케이션을 빌드해서 이미지를 생성하게되면 소스코드 변경없이 계속 그냥 docker build만 하게되면 `npm i`시 npm install을 통해 package.json에 있는 종속성들을 다시 다운받는게 아닌 cache를 이용해서 종속성을 다운받는다. 

하지만 위에서 진행했던 우리의 도커파일을 다시한번 봐보자

```dockerfile
FROM node:10

COPY ./ ./

RUN npm i

CMD ["node", "server.js"]
```

이게 잘 보면 비효율적이라는것을 알수 있는데 왜냐하면 종속성이 추가가 된것이 아니라 그냥 소스코드만 변경이되도 `npm i`시 종속성이 변한것이 없으므로 cache를 사용해야하는데 모든 종속성들을 다시 처음부터 다 다운받기 때문이다.

따라서 다음과 같이 바꿔준다.

```dockerfile
FROM node:10

COPY package.json ./

RUN npm i

COPY ./ ./

CMD ["node", "server.js"]
```

이렇게 하게되면 package.json만을 일단 COPY해오고 나서 npm i하게되면 package.json은 바뀐게 없으므로 `npm i`시 cache를 사용하여 종속성들을 다시한번 다운받게된다.

이렇게 하여 소스코드만을 수정했을때 종속성들을 다시 처음부터 다 다운받는 비효율적인것을 해결해 주었습니다.

### Docker Volume에 대하여..

Docker Container가 로컬의 파일들을 참조(Mapping)하여 변경사항을 감지하여 로컬에 변경사항이 생기면 그것을 Container에 바로 반영을 해준다.

`docker run -p 5000:8080 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app <이미지 아이디>`

## Docker Compose란 무엇인가?

docker compose는 다중 컨테이너 도커 애플리케이션을 정의하고 실행하기 위한 도구 입니다.

node.js와 redis-client가 있는 컨테이너와 redis-server가 있는 컨테이너가 쉽게 통신을 할 수 있게 해주는것이 docker compose입니다.

docker-compose는 버전과 서비스를 필수적으로 명시해줘야한다.

서비스는 컨테이너를 감싸는 부분이다.

`docker-compose up --build`명령어를 통해 docker-compose.yml파일에 있는 컨테이너들을 한번에 실행시킬수 있으며 `docker-compose down` 으로 다시 셧다운 시킬수 있다.

### docker-compose up VS docker-compose up --build

docker-compose up은 이미지가 없을때 빌드하고 실행시키며

docker-compose up --build는 이미지가 있든 없든 빌드를 하고 실행시킨다.

소스코드 변경시 변경사항을 저장해줘야 하므로 docker-compose up --build를 사용하는 것이 좋다.

`docker-compose up -d -build`하게되면 실행시킨후 바로 프롬프트를 띄워준다.

## Dockerfile.dev

Dockerfile.dev를 이미지를 빌드할때 쓰일 Dockerfile로서 사용하기위해서는 아래와 같이 `-f`옵션을 줘야한다.

`docker build -f Dockerfile.dev .`

Docker 환경에서 Node.js이든 React든 사용하려면 node_modules폴더는 로컬에 없는게 더 좋다 왜냐하면 Dockerfile에서 COPY명령어를 통해서 로컬에 있는 모든 폴더 파일들을 다 COPY하는데 이렇게 되면 node_modules도 복사하게 된다는것인데 node_modules폴더는 용량이 꽤 크기때문에 이것을 COPY하는데 시간도 오래걸리고 또한 package.json만 있으면 npm i 명령어로 다 설치가 가능하니까 local엔 node_modules 폴더가 없는게 좋다.


## docker-compose로 Test 자동화

```dockerfile
version: "3"
services:
  react:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - /usr/src/app/node_modules
      - ./:/usr/src/app
    stdin_open: true
  tests:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - /usr/src/app/node_modules
      - ./:/usr/src/app
    command: ["npm", "run", "test"]
```

이건 정말 나한테 필요한 자동화인거같다 오늘 아주 뿌듯한 수확을 거두었다..

## 운영환경을 위한 Nginx

리액트 앱을 개발환경에서 사용하게되면 개발서버가 따로 존재하지만 운영환경에서는 서버가 따로 존재하지 않는다. 이때 Nginx가 이 역할을 대신해준다.

### 개발환경과 운영환경 서버를 다른거 써야하는 이유

개발에서 사용하는 서버는 소스를 변경하면 자동으로 전체 앱을 다시 빌드해서 변경 소스를 반영해주는 것 같이 개발 환경에 특화된 기능들이 있기에 소스를 자동반영해주는 기능이 없는 Nginx 서버보다 더 적합합니다.
반면 운영환경에서는 소스를 변경할때 다시 즉각적으로 반영해줄 필요가 없으며 개발에 필요한 기능들이 필요하지 않기에 더 깔끔하고 빠른 Nginx를 웹 서버로 사용합니다.

## 운영환경을 위한 도커파일

첫번째로 DockerImage를 만들기 위한 Builder과정을 거치고난후

두분째로 Nginx에서 builder과정의 결과물로 나온 build파일을 사용자의 요청에 맞게 정적파일을 제공해줄수 있게 해준다.

## Travis CI란?

Travis CI는 Github에서 진행되는 오픈소스 프로젝트를 위한 지속적인 통합(Continuous Integration)서비스이다. 2011년에 설립되어 2012년에 급 성장하였으며 Ruby언어만 지원하였지만 현재 대부분의 개발 언어를 지원하고 있다. Travis CI를 이용하면 Github Repository에 있는 프로젝트를 특정 이벤트에 따라 자동으로 테스트, 빌드하거나 배포할수 있다. Private Repository는 유료로 일정 금액을 지불하고 사용할 수 있다.

## Travis CI의 흐름

`로컬 Git` -> `Github` -> `Travis CI` -> `AWS`

Github에 푸시가 됬으면 Travis CI에게 푸시가 되었다고 알려준다.

Travis CI가 중간에 껴서 Github에 푸시가된 코드를 빌드 및 테스트를 거쳐 AWS에 또 뿌려준다.

Github Repository 기준으로 최상단에 .travis.yml 파일이 있어야한다.

이 레포에 있는 docker-react-app폴더에 .travis.yml파일을 넣어줬더니 깃헙이 인식을 못해서 작동이 안된다. 따라서 [링크](https://github.com/godtaehee/docker-react-app) 에 따로 react-app을 두어서 Travis 관련된 테스트는 여기서 진행할 예정이다.