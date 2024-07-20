import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, Paper, TableContainer, Table, TableRow, TableBody, TableCell, Button, MenuItem } from '@mui/material'
import { ArrowRightAlt } from '@mui/icons-material';
import { styles } from './OnlinebankingStyles'
import logo from '../assets/banking logo.png'


const initialUsersList = [
    {
        id: 1,
        userName: 'user1',
        pin: '0123',
        balance: 5000,
        totalIn: 5000,
        totalOut: 0,
        transactionsList: [{ amount: 5000, type: 'Credit' }],
    },
    {
        id: 2,
        userName: 'user2',
        pin: '4567',
        balance: 5000,
        totalIn: 5000,
        totalOut: 0,
        transactionsList: [{ amount: 5000, type: 'Credit' }],
    },
    {
        id: 3,
        userName: 'user3',
        pin: '8901',
        balance: 5000,
        totalIn: 5000,
        totalOut: 0,
        transactionsList: [{ amount: 5000, type: 'Credit' }],
    }
]

interface IState {
    isLoggedin: boolean;
    userName: string;
    pin: string;
    balance: number;
    totalIn: number,
    totalOut: number,
    selectedUser: string | null;
    transferAmount: number | string;
    loanAmount: number | string;
    deleteUser: string;
    deleteUserPin: string;
    transactionsList: { amount: number, type: string }[]
    usersList: {
        id: number;
        userName: string;
        pin: string;
        balance: number;
        totalIn: number;
        totalOut: number;
        transactionsList: {
            amount: number;
            type: string;
        }[]
    }[],
    timeLeft: number;
    currentUser: {
        id: number;
        userName: string;
        pin: string;
        balance: number;
        totalIn: number;
        totalOut: number;
        transactionsList: {
            amount: number;
            type: string;
        }[]
    }
}

function Onlinebanking() {

    const [userName, setUserName] = useState<IState['userName']>('')
    const [pin, setPin] = useState<IState['pin']>('')
    const [isLoggedin, setIsLoggedin] = useState<IState['isLoggedin']>(false)
    const [usersList] = useState<IState['usersList']>(initialUsersList)
    const [transactionsList, setTransactionsList] = useState<IState['transactionsList']>([])
    const [balance, setBalance] = useState<IState['balance']>(5000)
    const [selectedUser, setSelectedUser] = useState<IState['selectedUser']>(null)
    const [transferAmount, setTransferAmount] = useState<IState['transferAmount']>('')
    const [loanAmount, setLoanAmount] = useState<IState['loanAmount']>('')
    const [deleteUser, setDeleteUser] = useState<IState['deleteUser']>('')
    const [deleteUserPin, setDeleteUserPin] = useState<IState['deleteUserPin']>('')
    const [minutesLeft, setMinutesLeft] = useState<IState['timeLeft']>(5)
    const [secondsLeft, setSecondsLeft] = useState<IState['timeLeft']>(60)
    const [inAmount, setInAmount] = useState<IState['totalIn']>(0)
    const [outAmount, setOutAmount] = useState<IState['totalOut']>(0)
    const [remainingUsersList, setRemainingUsersList] = useState<IState['usersList']>([])
    const [currentUser, setCurrentUser] = useState<IState['currentUser']>()

    const today = new Date()
    const transferAmountNum = Number(transferAmount)
    const loanAmountNum = Number(loanAmount)


    const onClickLoginIcon = () => {
        const checkUser = usersList.find(eachUser => eachUser.userName === userName && eachUser.pin === pin)

        if (checkUser !== undefined) {
            setIsLoggedin(true)
            const getUser = usersList.find(eachUser => eachUser.userName === userName)
            if (getUser !== undefined) {
                const getTransactionsList = getUser.transactionsList
                setTransactionsList(getTransactionsList)
                const getBalance = getUser.balance
                setBalance(getBalance)
                const getInAmount = getUser.totalIn
                setInAmount(getInAmount)
                const getOutAmount = getUser.totalOut
                setOutAmount(getOutAmount)
                setUserName(getUser.userName)
                setCurrentUser(getUser)
            }
        } else {
            alert('Invalid User')
        }
        const remainingUsersList = usersList.filter(eachUser => eachUser.userName !== userName)
        setRemainingUsersList(remainingUsersList)
        setMinutesLeft(5)
        setSecondsLeft(60)
        setUserName('')
        setPin('')
    }



    const onClickTransferButton = () => {

        if (transferAmountNum > balance) {
            alert('Insufficient balance')
            setSelectedUser('')
            setTransferAmount('')
            return
        } else if (transferAmountNum === 0 || transferAmountNum < 0) {
            alert('Invalid Amount')
            setSelectedUser('')
            setTransferAmount('')
            return
        }

        const newDebitTransaction = { amount: transferAmountNum, type: 'Debit' }
        setTransactionsList([newDebitTransaction, ...transactionsList])
        setBalance(balance - transferAmountNum)
        setOutAmount(outAmount + transferAmountNum)
        setSelectedUser('')
        setTransferAmount('')


        const transferToUser = usersList.find(eachUser => (
            eachUser.userName === selectedUser
        ))

        if (transferToUser !== undefined && transferAmountNum <= balance && transferAmountNum !== 0 && transferAmountNum > 0) {
            const addedCreditTransaction = { amount: transferAmountNum, type: 'Credit' }
            transferToUser.transactionsList = [addedCreditTransaction, ...transferToUser.transactionsList]
            transferToUser.balance = transferToUser.balance + transferAmountNum
            transferToUser.totalIn = transferToUser.totalIn + transferAmountNum
        }

    }



    const onClickLoanButton = () => {

        if (loanAmountNum === 0 || loanAmountNum < 0) {
            alert('Invalid Amount')
            setLoanAmount('')
            return
        }

        const tenPercent = (loanAmountNum / 10)
        if (tenPercent <= balance) {
            const newCreditTransaction = { amount: loanAmountNum, type: 'Credit' }
            setTransactionsList([newCreditTransaction, ...transactionsList])
            setBalance(balance => balance + loanAmountNum)
            setInAmount(inAmount => inAmount + loanAmountNum)
            setLoanAmount('')

        } else {
            alert('Insufficient balance for loan')
        }
    }



    const onClickDeleteButton = () => {
        if (userName === deleteUser) {
            alert('Your Account is deleted Successfully')
            setIsLoggedin(false)
        }
        setDeleteUser('')
        setDeleteUserPin('')
    }



    useEffect(() => {
        const timerId = setTimeout(() => {
            if (secondsLeft === 0) {
                setMinutesLeft(minutesLeft => minutesLeft - 1)
            }
            if (minutesLeft > 0) {
                if (secondsLeft === 0) {
                    setSecondsLeft(60)
                }
                setSecondsLeft(secondsLeft => secondsLeft - 1)
            } else if (minutesLeft === 0 && secondsLeft === 0) {
                setIsLoggedin(false)
            }
        }, 1000)

        return () => {
            clearTimeout(timerId)
        }
    }, [secondsLeft, minutesLeft])



    return (
        <Paper component='div' sx={styles.home_bg_container}>

            <Paper component='div' sx={styles.home_page}>
                {isLoggedin ?
                    (<Box sx={styles.welcome_container}>
                        <Typography variant='h5' color={'#000'}>Welcome Back {currentUser?.userName}!</Typography>
                        <Box component='img' src={logo} alt='logo' sx={{ height: 50, width: 50 }} />
                        <Box component='div' sx={styles.input_fields_container}>
                            <Box component='input' placeholder='User' sx={styles.input_fields} onChange={(e) => setUserName(e.target.value)} value={userName} />
                            <Box component='input' placeholder='PIN' sx={styles.input_fields} onChange={(e) => setPin(e.target.value)} value={pin} />
                            <ArrowRightAlt sx={styles.login_icon} onClick={onClickLoginIcon} />
                        </Box>
                    </Box>)
                    :
                    (<Box sx={styles.welcome_container}>
                        <Typography variant='h5' color={'#000'}>Please Login</Typography>
                        <Box component='div' sx={styles.input_fields_container}>
                            <Box component='input' placeholder='User' sx={styles.input_fields} onChange={(e) => setUserName(e.target.value)} value={userName} />
                            <Box component='input' placeholder='PIN' sx={styles.input_fields} onChange={(e) => setPin(e.target.value)} value={pin} />
                            <ArrowRightAlt sx={styles.login_icon} onClick={onClickLoginIcon} />
                        </Box>
                    </Box>)
                }

                {isLoggedin ?
                    (
                        <Box sx={styles.result_content_container}>
                            <Box sx={styles.current_balance_container}>
                                <Box >
                                    <Typography variant='h5'>Current balance</Typography>
                                    <Typography component='span'>As of {today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ', ' + today.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</Typography>
                                </Box>
                                <Typography variant='h3'>&#8377; {balance}</Typography>

                            </Box>

                            <Box sx={styles.main_content_container}>
                                <Box sx={styles.table_box}>
                                    <TableContainer component={Paper} sx={styles.table_container}>
                                        <Table >
                                            <TableBody>
                                                {transactionsList.map((eachTransaction, index) => (
                                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index + 'tra'}>
                                                        {eachTransaction.type === 'Credit' &&
                                                            <>
                                                                <TableCell align="left" ><Typography component='span' sx={styles.deposit_cell} >{transactionsList.length - index} Deposit</Typography></TableCell>
                                                                <TableCell align="left">{today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()}</TableCell>
                                                                <TableCell align="right"><Typography component='span' sx={styles.balance_in_table}>&#8377; {eachTransaction.amount}</Typography></TableCell>
                                                            </>}

                                                        {eachTransaction.type === 'Debit' &&
                                                            (<>
                                                                <TableCell align="left" ><Typography component='span' sx={styles.withdrawal_cell} >{transactionsList.length - index} Withdrawal</Typography></TableCell>
                                                                <TableCell align="left">{today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()}</TableCell>
                                                                <TableCell align="right"><Typography component='span' sx={styles.balance_in_table}>- &#8377; {eachTransaction.amount}</Typography></TableCell>
                                                            </>)}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>

                                <Box sx={styles.services_container}>
                                    <Paper sx={styles.transfer_container}>
                                        <Typography variant='h5'>Transfer Money</Typography>
                                        <Box sx={styles.input_fields_container}>
                                            <TextField
                                                select
                                                helperText="Transfer to"
                                                inputProps={{ disableUnderline: true, sx: { width: '120px', borderRadius: 20, outline: 'none', padding: '8px', backgroundColor: '#ffd699', } }}
                                                onChange={(e) => setSelectedUser(e.target.value)}
                                                value={selectedUser}
                                            >
                                                {remainingUsersList.map(users => (
                                                    <MenuItem key={users.id} value={users.userName}>
                                                        {users.userName}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <TextField value={transferAmount} helperText="Amount" type='number' inputProps={{ disableUnderline: true, sx: { width: '120px', borderRadius: 20, outline: 'none', padding: '8px', backgroundColor: '#ffd699', } }} onChange={(e) => setTransferAmount(Number(e.target.value))} />
                                            <Button variant='contained' sx={styles.send_button} onClick={onClickTransferButton}><ArrowRightAlt /></Button>
                                        </Box>
                                    </Paper>
                                    <Paper sx={styles.loan_container}>
                                        <Typography variant='h5'>Request Loan</Typography>
                                        <Box sx={styles.input_fields_container}>
                                            <TextField inputProps={{ disableUnderline: true, sx: { width: '120px', borderRadius: 20, outline: 'none', padding: '8px', backgroundColor: '#99ff99', } }} value={loanAmount} helperText="Amount" type='number' onChange={(e) => setLoanAmount(Number(e.target.value))} />
                                            <Button variant='contained' sx={styles.send_button} onClick={onClickLoanButton}><ArrowRightAlt /></Button>
                                        </Box>
                                    </Paper>
                                    <Paper sx={styles.delete_container}>
                                        <Typography variant='h5'>Close Account</Typography>
                                        <Box sx={styles.input_fields_container}>
                                            <TextField helperText="Confirm user" value={deleteUser} variant='outlined' inputProps={{ disableUnderline: true, sx: { width: '120px', borderRadius: 20, outline: 'none', padding: '8px', backgroundColor: '#ff9999', } }} onChange={(e) => setDeleteUser(e.target.value)} />
                                            <TextField helperText="Confirm Pin" value={deleteUserPin} variant='outlined' type='number' inputProps={{ disableUnderline: true, sx: { width: '120px', borderRadius: 20, outline: 'none', padding: '8px', backgroundColor: '#ff9999', } }} onChange={(e) => setDeleteUserPin(e.target.value)} />
                                            <Button variant='contained' sx={styles.send_button} onClick={onClickDeleteButton}><ArrowRightAlt /></Button>
                                        </Box>
                                    </Paper>
                                </Box>
                            </Box>

                            <Box sx={styles.info_container}>
                                <Box sx={styles.in_out_content}>
                                    <Typography >IN <Typography component='span' color={'#00ff55'} sx={{ fontSize: '25px', fontWeight: 600, marginLeft: '5px', marginRight: 5 }}> &#8377; {inAmount}</Typography></Typography>
                                    <Typography>OUT <Typography component='span' color={'#b30000'} sx={{ fontSize: '25px', fontWeight: 600, marginLeft: '5px' }}> &#8377; {outAmount}</Typography></Typography>
                                </Box>
                                <Box>
                                    <Typography>You will be logged out in <Typography component='span' sx={{ fontWeight: 600 }}>{minutesLeft}:{secondsLeft}</Typography></Typography>
                                </Box>
                            </Box>
                        </Box>
                    ) : null}
            </Paper>
        </Paper>
    )
}

export default Onlinebanking