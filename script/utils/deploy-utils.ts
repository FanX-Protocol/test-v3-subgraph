import { exec as execCallback } from 'child_process'
import * as util from 'util'

import { getLocalDeploymentParams, getSubgraphName, getSubgraphVersion, prepare } from './prepareNetwork'

const exec = util.promisify(execCallback)

// Creating subgraphs is only available from hosted-service dashboard
// yarn graph create $network_name-v2 --node https://api.thegraph.com/deploy/ --access-token $SUBGRAPH_DEPLOY_KEY"
export const build = async (network, subgraphType) => {
  console.log(`Building subgraph for ${network}`)
  console.log(`\n Copying constants & templates for ${network} \n`)
  await prepare(network, subgraphType)
  console.log(`\n Generating manifest for ${network} ${subgraphType} subgraph \n`)
  await exec(
    `cross-env mustache config/${network}/config.json ${subgraphType}-subgraph.template.yaml > ${subgraphType}-subgraph.yaml`
  )
  console.log(`\n Generating types with codegen \n`)
  await exec(`graph codegen ${subgraphType}-subgraph.yaml`)
  console.log(`\n Building subgraph \n`)
  await exec(`graph build ${subgraphType}-subgraph.yaml`)
}

export const deploy = async (subgraphType) => {
  // 로컬 배포에서는 git 변경사항 체크를 건너뜁니다
  
  const subgraphName = getSubgraphName(subgraphType)
  const { node, ipfs } = getLocalDeploymentParams()
  const versionLabel = getSubgraphVersion(subgraphType)

  try {
    // 먼저 로컬 Graph 노드에 서브그래프 생성 시도
    try {
      console.log(`Creating subgraph: ${subgraphName}`)
      await exec(`graph create ${subgraphName} --node ${node}`)
    } catch (createError) {
      // 이미 존재하는 경우 무시하고 계속 진행
      console.log('Subgraph may already exist, continuing with deployment...')
    }

    // 서브그래프 배포
    console.log(`Deploying subgraph: ${subgraphName} with version ${versionLabel}`)
    const { stdout } = await exec(
      `graph deploy ${subgraphName} --node ${node} --ipfs ${ipfs} --version-label ${versionLabel} ${subgraphType}-subgraph.yaml`
    )
    
    console.log(stdout)
    console.log('Subgraph deployed successfully to local Graph node.')
  } catch (e) {
    console.log(e.stdout || e)
    console.log('Error: Failed to deploy subgraph. Please try again.')
    process.exit(1)
  }
}
