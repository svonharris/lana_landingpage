require "sinatra"
require "pry"
require "sinatra/reloader" if development?
require "logger"
require "ap"
require "pp"
require "json"
require "logger"
enable :logger
enable :sessions

################################################

class Customer
	attr_accessor :phonenumber, :firstname, :lastname, :emailaddress
	# def initialize(person)
	# 	@person = person
	# end

	def parseForm(form)
		form.each { |key, value| 
			if key === "fname"
				puts "first name"
				@firstname = value
				# binding.pry
			elsif key === "lname"
				puts "last name"
				@lastname = value
				# binding.pry
			elsif key === "email"
				puts "email address"
				@emailaddress = value
				# binding.pry
			elsif key === "phone"
				puts "phone number"
				@phonenumber = value
				# binding.pry
			else 
				puts "nope"
			end
		}
			binding.pry
	end

	def number
		if @phonenumber === "" || @phonenumber === " "
			return false
		else
			n = @phonenumber
			if n.length === 10
				if /\D/ === n
					return false
				else
					return true
				end
			else
				return false
			end
		end
	end

	def email
		if @emailaddress === "" || @emailaddress === " "
			return false
		else
			e = @emailaddress
			if /^[\w\.\-\_\+]+@[\w-]+\.\w{2,4}$/ === e
				return true
			else
				return false
			end
		end
	end

end

################################################ Object {fname: "she", lname: "har", email: "a@a.com", phone: ""}

get '/' do
	erb :lanalandingpage
end

post '/signup' do
	session[:quiz] = Customer.new
	form = JSON.parse(params[:signup_form])
	session[:quiz].parseForm(form)
	redirect to('/thankyou')
	# status 200
end

get '/thankyou' do
	binding.pry
	# session[:quiz].number
	# session[:quiz].email

	erb :thankyou
end