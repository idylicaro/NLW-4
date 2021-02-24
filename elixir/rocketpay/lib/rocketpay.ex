defmodule Rocketpay do
  alias Rocketpay.Users.Create, as: CreateUser
  alias Rocketpay.Users.Get, as: GetUser

  alias Rocketpay.Accounts.Deposit
  alias Rocketpay.Accounts.Withdraw

  defdelegate create_user(params), to: CreateUser, as: :call
  defdelegate get_user(nickname), to: GetUser, as: :call
  defdelegate deposit(params), to: Deposit, as: :call
  defdelegate withdraw(nickname), to: Withdraw, as: :call

end
