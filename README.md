### 가상화 기술이 나오기 전

가상화 기술이 나오기 전에는 한대의 서버를 하나의 용도로만 사용했다.

남는 서버 공간을 그대로 방치하고, 하나의 서버에 하나의 운영체제와 하나의 프로그램만을 운영하여 비효율적으로 운영하였다.

### 하이퍼 바이저 기반의 가상화 출현

논리적으로 공간을 분할하여 VM이라는 독립적인 가상 환경의 서버가 이용 가능해졌다.

하이퍼 바이저는 호스트 시스템에서 다수의 게스트 OS를 구동할 수 있게 하는 소프트웨어이며 하드웨어를 가상화하면서 하드웨어와 각각의 VM을 모니터링하는 중간 관리자이다.

### docker ps

현재 실행중인 컨테이너 나열

ps는 process status의 줄임말

### docker run

docker run = docker create <이미지 이름> + docker start <컨테이너 아이디/이름>

### docker create 이미지이름

docker create 할때 컨테이너의 하드디스크에 파일 스냅샷을 넣어준다.

### docker start 컨테이너 아이디/이름

docker start 할때 시작시 실행 될 명령어를 이용해 컨테이너를 실행한다.

docker start -a를 해줘야 docker container의 output을 화면에 출력을 해준다.

### docker stop 혹은 kill <중지할 컨테이너 아이디/이름>

**stop**은 gracefully하게 중지

→ 메시지를 보내고 있었다면 보내고 있던 메시지를 보내고 나서 중지

**kill은 Stop과 달리 어떠한 것도 기다리지 않고 컨테이너를 중지시킴**

### docker rm <아이디/이름>

실행중인 컨테이너는 **먼저 중지한 후**에 삭제 가능

- docker rm 'docker ps -a -q' ← 한번에 지우는거
- docker rmi <이미지 id>
- docker system prune 한번에 컨테이너, 이미지 네트워크 모두 삭제하고 싶다면? 실행중이지 않은것만 삭제가능

### docker exec <컨테이너 아이디> <명령어>

이미 실행중인 컨테이너에 명령어를 전달하고 싶다면? 위의 명령어를 사용

**docker run vs docker exec**

1. docker run 은 새로 컨테이너를 만들어서 실행
2. docker exec은 이미 실행중인 컨테이너에 명령어를 전달

## Redis

### Redis 실행과정

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

### Dockerfile이란?

Dockerfile이란 Docker Image를 만들기 위한 설정 파일이며 컨테이너가 어떻게 행동해야 하는지에 대한 설정들을 정의해줍니다.

### Dockerfile 만드는 순서

1. 도커 이미지가 필요한 것이 무엇인지를 생각하기
2. 베이스 이미지를 명시해준다. (파일 스냅샷에 해당)
    1. 베이스 이미지란?
        1. 도커 이미지는 여러개의 레이어로 되어있다. 그중에서 베이스 이미지는 이 이미지의 기반이 되는 부분이다. 레이어는 중간 단계의 이미지라고 생각하면 됨
        2. 간단히 베이스 이미지는 OS라고 생각하면된다.
3. 추가적으로 필요한 파일을 다운 받기 위한 몇가지 명령어를 명시해준다. (파일 스냅샷에 해당)
4. 컨테이너 시작시 실행 될 명령어를 명시해준다. (시작시 실행 될 명령어에 해당)

### Dockerfile 실제로 만들기

파일 이름은 Dockerfile이여야만 함

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

### 도커 파일을 통해 실제 이미지를 생성하는 과정

`Dockerfile` -> `도커 클라이언트` -> `도커 서버` -> `이미지`

#### docker build .
위의 명령어를 통해 도커 파일에 입력된 것들일 도커 클라이언트에 전달되어서 도커 서버가 인식하게 하여야 한다. 

build 명령어는 해당 디렉토리 내에서 `Dockerfile`이라는 파일을 찾아서 도커 클라이언트에게 전달시켜준다.

`docker build ./` 이렇게 슬래시(/)까지 해주는것을 권장

#### docker build . 후에 일어나는 일
베이스 이미지를 임시 컨테이너에 넣어줌 만약 그 외의 레이어들이 있다면(Dockerfile의 RUN부분) 그것또한 넣어준다.

이 임시컨테이너를 기반으로 새로운 이미지가 생성된다.

### 생성한 DockerImage 이름 부여하기

`docker build -t 나의 도커 아이디/저장소/프로젝트 이름:버전 ./`
이렇게 빌드를 하게되면 이름을 가지고 빌드를 할수 있게된다.

t는 tag의 약자이다.

### Node.js 애플리케이션 Docker로 실행하기

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

