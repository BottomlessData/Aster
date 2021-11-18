// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";


contract Task{
    //CELO contract address on Alfajores testnet
    IERC20 public CELO = IERC20(address(0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9));
    
    //declare required variables
    address public taskOwner;
    address payable manager = payable(0x83cB1abd58BAc27DFE9843BcEF6960E0b0EA5Af9);
    
    uint numLabelers;
    uint numLabelersPaid;
    uint TaskId;
    bool TaskOpen;
    uint256 totalAmount;
    uint256 rewardPerLabeler;
    uint256 fees;

    constructor(uint TID, address tOwner, uint nLabelers, uint256 amount){     
        // initialize variables
        taskOwner = tOwner;
        TaskId = TID;
        TaskOpen = true;
        numLabelers = nLabelers;
        //totalAmount = X * 10^18
        totalAmount = amount * 10**18;
        numLabelersPaid = 0;
    }
    
    function fundTask() public payable{
        require(msg.sender == taskOwner, "Task: Only Task Owner can fund this contract.");
        require(CELO.balanceOf(msg.sender) >= totalAmount, "Task: insufficient funds.");
        require(msg.value == totalAmount, "Task: Unmatching funds.");
        
        feeCalculations();
    }
    
    function feeCalculations() private {
        //5% of total amount is collected as process fees
        fees = (5 * totalAmount)/100;
        CELO.transfer(manager, fees);
        
        //update totalAmount after paying fees
        totalAmount = totalAmount - fees;
        
        //reward per each labeler
        rewardPerLabeler = totalAmount / numLabelers;
    }

    
    function approveSubmission(address payable labeler) public{
        require(TaskOpen == true, "Task: Task is closed.");
        require(msg.sender == taskOwner);
        //payLabeler once task owner approves submission
        payLabeler(labeler);
        
        //track number of labelers paid and closed task if all have been paid
        numLabelersPaid = numLabelersPaid + 1;
        if (numLabelersPaid == numLabelers){
            TaskOpen = false;
        }
    }
    
    function payLabeler(address payable labeler) private{
        //transfer CELO to labeler
        CELO.transfer(labeler,rewardPerLabeler);
        //update totalAmount
        totalAmount = totalAmount - rewardPerLabeler;
    }
    

    
//------------HELPER FUNCTIONS------------------------
    
    //get balance of Task SC
    function getTaskBalance() public view returns(uint){
        return CELO.balanceOf(address(this));
    }
    
    function getTaskID() public view returns(uint){
        return TaskId;
    }
    
    function getNumLabelers() public view returns(uint){
        return numLabelers;
    }
        
    function getTotalAmount() public view returns(uint256){
        return totalAmount;
    }
        
    //get state of the Task 
    function getTaskState() public view returns(bool){
        return TaskOpen;
    }
    
    //get fees charged for this task
    function getFees() public view returns(uint256){
        return fees;
    }
    
    //get balance of the sender 
    function getBalance() public view returns(uint256){
        return CELO.balanceOf(msg.sender);
    }
    
    
}

