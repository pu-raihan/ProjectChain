const ProjectChain = artifacts.require('./ProjectChain.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('ProjectChain', ([deployer, auther]) => {
  let projectchain

  before(async () => {
    projectchain = await ProjectChain.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await projectchain.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await projectchain.name()
      assert.equal(name, 'ProjectChain')
    })
  })

  describe('project', async () => {
    let result, projCount
    const projHash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'
    const projSize = '1'
    const projType = 'TypeOfTheProject'
    const projName = 'NameOfTheProject'
    const projDesc = 'DescriptionOfTheProject'

    before(async () => {
      result = await projectchain.uploadProj(projHash, projSize, projType, projName, projDesc, { from: auther })
      projCount = await projectchain.projCount()
    })

    //check event
    it('upload proj', async () => {
      // SUCESS
      assert.equal(projCount, 1)
      const event = result.logs[0].args
      assert.equal(event.projId.toNumber(), projCount.toNumber(), 'Id is correct')
      assert.equal(event.projHash, projHash, 'Hash is correct')
      assert.equal(event.projSize, projSize, 'Size is correct')
      assert.equal(event.projType, projType, 'Type is correct')
      assert.equal(event.projName, projName, 'Name is correct')
      assert.equal(event.projDesc, projDesc, 'Description is correct')
      assert.equal(event.auther, auther, 'Auther is correct')

      // FAILURE: Project must have hash
      await projectchain.uploadProj('', projSize, projType, projName, projDesc, { from: auther }).should.be.rejected;

      // FAILURE: Project must have size
      await projectchain.uploadProj(projHash, '', projType, projName, projDesc, { from: auther }).should.be.rejected;
      
      // FAILURE: Project must have type
      await projectchain.uploadProj(projHash, projSize, '', projName, projDesc, { from: auther }).should.be.rejected;

      // FAILURE: Project must have name
      await projectchain.uploadProj(projHash, projSize, projType, '', projDesc, { from: auther }).should.be.rejected;

      // FAILURE: Project must have description
      await projectchain.uploadProj(projHash, projSize, projType, projName, '', { from: auther }).should.be.rejected;
    })

    //check from Struct
    it('lists proj', async () => {
      const proj = await projectchain.projects(projCount)
      assert.equal(proj.projId.toNumber(), projCount.toNumber(), 'id is correct')
      assert.equal(proj.projHash, projHash, 'Hash is correct')
      assert.equal(proj.projSize, projSize, 'Size is correct')
      assert.equal(proj.projName, projName, 'Size is correct')
      assert.equal(proj.projDesc, projDesc, 'Description is correct')
      assert.equal(proj.auther, auther, 'Auther is correct')
    })
  })
})