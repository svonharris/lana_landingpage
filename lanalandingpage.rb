require "sinatra"
require "pry"
require "sinatra/reloader" if development?
require "logger"
require "ap"
require "pp"
require "json"
require "logger"
require 'sinatra/flash'
enable :logger
enable :sessions

################################################

class Customer
	attr_accessor :phonenumber, :firstname, :lastname, :emailaddress
	
	@@errors = []

	def anyErrors
		if @@errors.empty?
			return true
		else
			return @@errors
		end
	end

	def show
		return @@errors
	end

	def parseForm(form)
		form.each { |key, value| 
			if key === "fname"
				@firstname = value
			elsif key === "lname"
				@lastname = value
			elsif key === "email"
				@emailaddress = value
			elsif key === "phone"
				@phonenumber = value
			else 
				return false
			end
		}
			binding.pry
	end

	def number
		if @phonenumber === "" || @phonenumber === " "
			# return true;
		else
			n = @phonenumber
			if n.length === 10
				if /\D/ === n
					@@errors << "phone"
				else
					puts "true"
				end
			else
				@@errors << "phone"
			end
		end
	end

	def email
		if @emailaddress === "" || @emailaddress === " "
			@@errors << "email"
		else
			e = @emailaddress
			if /^[\w\.\-\_\+]+@[\w-]+\.\w{2,4}$/ === e
				# return true
			else
				@@errors << "email"
			end
		end
		# binding.pry
	end

end

################################################ Object {fname: "she", lname: "har", email: "a@a.com", phone: ""}

get '/' do
	# @firstn = "#{flash[:firstn]}"
	# @lastn = "#{flash[:lastn]}"
	# @email = "#{flash[:email]}"
	# @phone = "#{flash[:phone]}"
	erb :lanalandingpage
end

post '/signup' do
	session[:data] = Customer.new
	session[:data].parseForm(params)
	session[:data].number
	session[:data].email
	binding.pry
	errorstatus = session[:data].anyErrors
	if errorstatus === true
		redirect to('/thankyou')
	else
		flash[:firstn] = "Alphabetical characters only"
		flash[:lastn] = "Alphabetical characters only"
		flash[:email] = "Email address incorrect"
		flash[:phone] = "Must have 10 digits"
		# for i in errorstatus
		# 	if errorstatus[i] === "email"
		# 		@email = "#{flash[:email]}"
		# 	end
		# end 
		@email = "#{flash[:email]}"
		redirect to('/')
	end
end

post '/signup_js' do
	session[:data] = Customer.new
	form = JSON.parse(params[:signup_form])
	session[:data].parseForm(form)
	session[:data].number
	session[:data].email
	binding.pry
	# redirect to('/thankyou')
	return "success"
end

get '/thankyou' do
	# binding.pry
	erb :thankyou
end
