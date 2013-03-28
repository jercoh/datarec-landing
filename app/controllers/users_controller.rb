class UsersController < ApplicationController
require 'csv'

  def new
  	@user = User.new
  end
  
  def create 
  	@user = User.new(:email => params[:email])
  		respond_to do |format|
        if @user.save
          format.html {redirect_to :action => 'new'}
          format.js { render( :json => ["OK"] ) }
        else 
          format.html
          format.json {render( :json => @user.errors.full_messages, :status => 400)}
        end
      end
  		#UserMailer.registration_confirmation(@user).deliver
  end
  
  def index 
  	@users = User.all 
  end
  
  def export_csv
  	@users = User.all 
  	user_csv = CSV.generate do |csv|
  		#header row
  		csv <<["Email", "UserType"]
  		#data row
	  	@users.each do |user|
  		csv <<[user.email, user.usertype]
  		end	
  	end
  	send_data(user_csv, :type => 'text/csv', :filename => 'user_record.csv')
  end
end
