class KitController < ApplicationController
  
  def index
    @url = "#actions"
  end
  
  def get_act
    id = params[:id]
    
    result = {}
    result["error"] = false
    
    if id.blank?
      res = Act.public
    else
      mission = Mission.find(id)
      res = mission.acts if mission
    end
    
    if res.size < 1
      result["error"] = true
    else
      result["res"] = res
    end
    respond_to do |format|
      format.json {
        render :json => result.to_json
      }
    end
  end
  
  def get_missions
    result = {}
    result["error"] = false
    
    res = Mission.public
    
    if res.size < 1
      result["error"] = true
    else
      result["res"] = res 
    end 
    
    respond_to do |format|
      format.json {
        render :json => result.to_json
      }
    end
  end
  
end
