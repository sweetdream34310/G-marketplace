pipeline {
  agent any
  environment {
    AWS_ACCOUNT_ID="383777081513"
    AWS_DEFAULT_REGION="us-east-1" 
    CLUSTER_NAME="ridgewoodglobal-prod-cluster-2"
    SERVICE_NAME="ridgewoodglobal-prod-container-service"
    TASK_DEFINITION_NAME="ridgewoodglobal-task-definition"
    DESIRED_COUNT="1"
    IMAGE_REPO_NAME="ridgewoodglobal"
    IMAGE_TAG="${env.BUILD_ID}"
    REPOSITORY_URI = "383777081513.dkr.ecr.us-east-1.amazonaws.com/ridgewoodglobal"
    registryCredential = "ridgewood-aws"
  }
  
  stages {
    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build("${IMAGE_REPO_NAME}:${IMAGE_TAG}")
        }
      }
    }
   
    // Uploading Docker images into AWS ECR
    stage('Pushing to ECR') {
      steps {  
        script {
			    docker.withRegistry("https://" + REPOSITORY_URI, "ecr:${AWS_DEFAULT_REGION}:" + registryCredential) {
            dockerImage.push()
          }
        }
      }
    }
      
    // Deploy  
    stage('Deploy') {
      steps{
        withAWS(credentials: registryCredential, region: "${AWS_DEFAULT_REGION}") {
          script {
			      sh './script.sh'
          }
        } 
      }
    }      
  }
}
