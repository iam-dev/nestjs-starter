node {
  // Change values here
  def project = "nestjs"
  def appName = "nestjs-starter"
  def port = "3000"
  def staticIp = ""

  // Other variables
  def feSvcName = "${appName}"
  def imageTag = "gcr.io/${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  checkout scm

  stage("Static analysis") {
    sh "docker build -t ${imageTag} ."

    // Check style    
    sh "docker run --rm ${imageTag} npm run lint"
    step([
      $class: "hudson.plugins.checkstyle.CheckStylePublisher",
      checkstyle: "reports/checkstyle.xml",
      unstableTotalAll: "10",
      failedTotalAll: "5",
      usePreviousBuildAsReference: true
    ])

    // Unit test
    sh "docker run --rm ${imageTag} npm test"
    step([
      $class: "XUnitBuilder",
      thresholds: [
        [$class: "FailedThreshold", failureThreshold: "1"]
      ],
      tools: [
        [$class: "JUnitType", pattern: "reports/clover.xml"]
      ]
    ])
  }

  if (currentBuild.result == null || currentBuild.result == "SUCCESS") {
    stage("Build image") {
      sh "docker build -t ${imageTag} ."
    }

    stage("Push image to registry") {
      sh "gcloud docker -- push ${imageTag}"
    }

    stage('Deploy application') {
      // Replace variables within deployment files into values provided above
      sh "find k8s/ -type f -exec sed -i.bak 's/{{ project }}/${project}/g' {} \\;"
      sh "find k8s/ -type f -exec sed -i.bak 's/{{ appName }}/${appName}/g' {} \\;"
      sh "find k8s/ -type f -exec sed -i.bak 's/{{ port }}/${port}/g' {} \\;"
      sh "find k8s/ -type f -exec sed -i.bak 's/{{ staticIp }}/${staticIp}/g' {} \\;"
      sh "find Dockerfile -type f -exec sed -i.bak 's/8080/${port}/g' {} \\;"

      switch (env.BRANCH_NAME) {
        // Roll out to canary environment
        case "canary":
          // Change deployed image in canary to the one we just built
          sh("sed -i.bak 's#gcr.io/${project}/${appName}:1.0.0#${imageTag}#' ./k8s/canary/*.yaml")
          sh("kubectl --namespace=production apply -f k8s/services/")
          sh("kubectl --namespace=production apply -f k8s/canary/")
          sh("echo http://`kubectl --namespace=production get service/${feSvcName} --output=json | jq -r '.status.loadBalancer.ingress[0].ip'` > ${feSvcName}")
          break

          // Roll out to production
        case "master":
          // Change deployed image in production to the one we just built
          sh "sed -i.bak 's#gcr.io/${project}/${appName}:1.0.0#${imageTag}#' ./k8s/production/*.yaml"
          sh "kubectl --namespace=production apply -f k8s/services/"
          sh "kubectl --namespace=production apply -f k8s/production/"
          sh "echo http://`kubectl --namespace=production get service/${feSvcName} --output=json | jq -r '.status.loadBalancer.ingress[0].ip'` > ${feSvcName}"
          break

          // Roll out a dev environment
        default:
          // Create namespace if it doesn't exist
          sh "kubectl get ns ${env.BRANCH_NAME} || kubectl create ns ${env.BRANCH_NAME}"
          // Don't use public load balancing for development branches
          sh "sed -i.bak 's#LoadBalancer#ClusterIP#' ./k8s/services/service-exposed.yaml"
          sh "sed -i.bak 's#gcr.io/${project}/${appName}:1.0.0#${imageTag}#' ./k8s/dev/*.yaml"
          sh "kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/services/"
          sh "kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/dev/"
          echo "To access your environment run `kubectl proxy`"
          echo "Then access your service via http://localhost:8001/api/v1/proxy/namespaces/${env.BRANCH_NAME}/services/${feSvcName}:80/"
      }
    }
  }
}