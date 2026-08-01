import { Skeleton } from "moti/skeleton"
import { View } from "react-native"


const productSkeleton = ({ colorScheme}: { colorScheme: 'light' | 'dark' | undefined}) => {
  return (
   <View  className="w-[50%] mb-4 p-3 bg-surface-container-low       
  rounded-xl border border-outline-variant">                                         
            {/* Mock Image */}                                                       
            <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'}          
  height={128} width="100%" radius={8} />                                            
            <View className="mt-3">                                                  
              {/* Mock Status Badge */}                                              
              <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'}        
  height={20} width={60} radius="round" />                                           
            </View>                                                                  
            <View className="mt-2">                                                  
              {/* Mock Title */}                                                     
              <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'}        
  height={16} width="80%" radius={4} />                                              
            </View>                                                                  
            <View className="mt-2">                                                  
              {/* Mock Price */}                                                     
              <Skeleton colorMode={colorScheme === 'dark' ? 'dark' : 'light'}        
  height={24} width="50%" radius={4} />                                              
            </View>                                                                  
          </View>  
  )
}

export default productSkeleton
