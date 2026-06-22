pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'kushalsapkota/cicd-app'
        DOCKER_TAG = "v${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Kushal-Sapkota/cicd-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                nodejs('NodeJS-18') {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                nodejs('NodeJS-18') {
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('Deploy') {
            steps {
                sh "docker stop cicd-app || true"
                sh "docker rm cicd-app || true"
                sh "docker run -d --name cicd-app -p 3000:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }
    }

    post {
        success {
            echo "Pipeline completed. App running at port 3000."
        }
        failure {
            echo "Pipeline failed. Check logs."
        }
        always {
            sh "docker logout"
            cleanWs()
        }
    }
}
