require "sinatra"
require "pry"
require "sinatra/reloader" if development?
require "logger"
require "ap"
require "json"
require 'sinatra/flash'
require 'mongo'
require 'json/ext'
enable :logger
enable :sessions

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'lanalanding')
db = client.database

################################################

class Customer
	attr_accessor :phonenumber, :firstname, :lastname, :emailaddress, :errors
	

	def initialize
		@errors = []
	end

	def anyErrors
		if @errors.empty?
			return false
		else
			return @errors
		end
	end

	def parseForm(form)
		form.each { |key, value| 
			if key === "fname"
				@firstname = value
				# binding.pry
			elsif key === "lname"
				@lastname = value
			elsif key === "email"
				@emailaddress = value
			elsif key === "phone"
				@phonenumber = value
			end
		}
	end

	def birthname(birthname)
		# binding.pry
		if birthname === "" || birthname === " "
			return false
		else
			fn = birthname
			if /\d/.match(fn) || /\W/.match(fn) # is a digit or is not a-z/0-9
				return false
			else
				# add to database
			end
		end
	end

	def number
		if @phonenumber.to_s.empty? || @phonenumber == " "
			
		else
			n = @phonenumber
			if n.length === 10
				if /\D/.match(n)
					@errors << "phone"
				else
					# add to database
				end
			else
				@errors << "phone"
			end
		end

		# binding.pry
	end

	def email
		if @emailaddress === "" || @emailaddress === " "
			@errors << "email"
		else
			e = @emailaddress
			if /^[\w\.\-\_\+]+@[\w-]+\.\w{2,4}$/.match(e)
				# add to database
			else
				@errors << "email"
			end
		end
		# binding.pry
	end

end


################################################

get '/' do
	if session[:printError].nil? === false
		flash[:firstn] = "Aplhabetical characters only"
		flash[:lastn] = "Alphabetical characters only"
		flash[:email] = "Email address incorrect"
		flash[:phone] = "Must have 10 digits"

		session[:printError].each do |index|
			if index === "fname"
				@firstn = "#{flash[:firstn]}"
			elsif index === "lname"
				@lastn = "#{flash[:lastn]}"
			elsif index === "email"
				@email = "#{flash[:email]}"
			elsif index === "phone"
				@phone = "#{flash[:phone]}"
			end
		end
		session.clear
	end

	erb :lanalandingpage
end



post '/signup' do
	session[:data] = Customer.new
	session[:data].parseForm(params)

	collection = client[:lana_contacts]
	
	if session[:data].birthname(session[:data].firstname) === false 
		session[:data].errors.push("fname")
	else
		# add to database
	end
	if session[:data].birthname(session[:data].lastname) === false 
		session[:data].errors.push("fname")
	else
		# add to database
	end
	session[:data].email
	session[:data].number

	collectError = session[:data].anyErrors
	if collectError === false
		doc = params[:form]
		result = collection.insert_one(doc) 
		result.n
		redirect to('/thankyou')
	else
		session[:printError] = collectError
		redirect to('/')
	end
end




post '/signup_js', :provides => :json do
	session[:data] = Customer.new
	binding.pry
	session[:data].parseForm(params[:form])

	collection = client[:lana_contacts]
	
	if session[:data].birthname(session[:data].firstname) === false 
		session[:data].errors.push("fname")
	end
	if session[:data].birthname(session[:data].lastname) === false 
		session[:data].errors.push("fname")
	end
	session[:data].email
	session[:data].number
	
	collectError = session[:data].anyErrors
	if collectError === false
		doc = params[:form]
		result = collection.insert_one(doc) 
		result.n 
		halt 200, {:status => 200}.to_json	
	else
		session[:printError] = collectError
		redirect to('/')
	end

end



get '/thankyou' do
	# binding.pry
	erb :thankyou
end

